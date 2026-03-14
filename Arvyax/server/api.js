import app from './app.js';
import connectDB from './config/database.js';

// Cache the MongoDB connection for serverless environment
let isConnected = false;

// Middleware to ensure DB connection before handling API routes
const connectAndExecute = async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Database connection failed in serverless function:', error);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  }
  next();
};

app.use(connectAndExecute);

// Export the Express app as a serverless function
export default app;
