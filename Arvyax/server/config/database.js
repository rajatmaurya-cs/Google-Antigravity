import mongoose from 'mongoose';

/** 
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations in production.
 */
let cached = globalThis.__mongoose;

if (!cached) {
  cached = globalThis.__mongoose = { conn: null, promise: null };
}

const redactMongoHost = (uri) => {
  if (!uri || typeof uri !== 'string') return null;
  try {
    // Works for mongodb:// and mongodb+srv:// in modern Node.
    const parsed = new URL(uri);
    return parsed.hostname || null;
  } catch {
    const match = uri.match(/^mongodb(?:\+srv)?:\/\/(?:[^@]*@)?([^/?]+)/i);
    return match?.[1] || null;
  }
};

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
    if (!cached._diagnosticsLogged) {
      cached._diagnosticsLogged = true;
      console.log('MongoDB connect diagnostics:', {
        nodeEnv: process.env.NODE_ENV || 'development',
        vercel: !!process.env.VERCEL,
        vercelEnv: process.env.VERCEL_ENV,
        vercelRegion: process.env.VERCEL_REGION,
        hasMongoUri: !!uri,
        mongoHost: redactMongoHost(uri),
      });

      mongoose.connection.on('connected', () => console.log('MongoDB event: connected'));
      mongoose.connection.on('disconnected', () => console.log('MongoDB event: disconnected'));
      mongoose.connection.on('error', (e) => console.error('MongoDB event: error:', e?.message || e));
    }

    const opts = {
      bufferCommands: false,
      bufferTimeoutMS: 30000,
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
    console.error('✗ MongoDB connection failed:', {
      name: e?.name,
      message: e?.message,
      code: e?.code,
    });
    throw e; // Throw so the serverless function can return a 500
  }

  return cached.conn;
};

export default connectDB;
