import app from './app.js';
import connectDB from './config/database.js';

// Serverless function payload handler
export default async function handler(req, res) {
  // Ensure database is connected before processing the request
  await connectDB();
  
  // Forward the request to your Express app
  return app(req, res);
}
