import mongoose from 'mongoose';

/** 
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations in production.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
      connectTimeoutMS: 10000, 
      serverSelectionTimeoutMS: 10000, 
    };

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-journal';

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('✓ New MongoDB connection established');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('✗ MongoDB connection failed:', e.message);
    throw e; // Throw so the serverless function can return a 500
  }

  return cached.conn;
};

export default connectDB;
