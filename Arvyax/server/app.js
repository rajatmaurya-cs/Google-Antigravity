import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import journalRoutes from './routes/journal.js';
import { errorHandler, asyncHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// Vercel (and most hosts) run behind a proxy that sets X-Forwarded-For.
// express-rate-limit validates this and will warn/error unless trust proxy is enabled.
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local Vite dev server
    'http://localhost:3000', // Alternative local dev server
    process.env.VITE_API_URL, // Deployed or custom URL
    process.env.CORS_ORIGIN,
    /\.vercel\.app$/ // Allow any deploy previews
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
app.use(apiLimiter);
console.log("Request Hit the Backend");
// Health check endpoint
app.get('/api/health', asyncHandler(async (req, res) => {
  // If the deployed entrypoint isn't the serverless handler, ensure DB is still attempted here.
  try {
    await connectDB();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e?.message || 'Failed to connect to database',
      timestamp: new Date().toISOString(),
      db: { readyState: mongoose.connection.readyState },
    });
  }
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    db: {
      readyState: mongoose.connection.readyState,
    },
  });
}));

// API Routes
app.use('/api/journal', journalRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Error Handler
app.use(errorHandler);

export default app;
