import app from './app.js';
import connectDB from './config/database.js';

// Serverless function payload handler
export default async function handler(req, res) {
  try {
    // Ensure database is connected before processing the request
    await connectDB();

    // Forward the request to your Express app
    return app(req, res);
  } catch (err) {
    const message = err?.message || 'Failed to connect to database';
    console.error('API handler error:', message);
    return res.status(500).json({
      success: false,
      message,
    });
  }
}
