import express from 'express';
import cors from 'cors';
import journalRoutes from './routes/journal.js';
import { errorHandler, asyncHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
