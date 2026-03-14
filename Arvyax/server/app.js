import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import journalRoutes from './routes/journal.js';
import { errorHandler, asyncHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

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

// Health check endpoint
app.get('/api/health', asyncHandler(async (req, res) => {
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
