import mongoose from 'mongoose';

/** 
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations in production.
 */
let cached = globalThis.__mongoose;

if (!cached) {
  cached = globalThis.__mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn?.connection?.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing MONGODB_URI in environment (required in production)');
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      maxPoolSize: 10,
    };

    const fallbackUri = 'mongodb://localhost:27017/ai-journal';

    mongoose.set('bufferCommands', false);
    cached.promise = mongoose.connect(uri || fallbackUri, opts).then((m) => {
      console.log('✓ MongoDB connection established');
      return m;
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
