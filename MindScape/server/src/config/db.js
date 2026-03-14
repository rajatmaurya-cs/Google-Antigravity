const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI environment variable is missing.');
    }

    // In serverless (Vercel), this file may be evaluated multiple times across invocations.
    // Cache the connection promise globally to avoid opening a new connection per request.
    const cached = global.__MONGOOSE_CONN__ || (global.__MONGOOSE_CONN__ = { conn: null, promise: null });

    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoUri).then((m) => m.connection);
    }

    try {
        cached.conn = await cached.promise;
        if (cached.conn?.host) {
            console.log(`MongoDB Connected: ${cached.conn.host}`);
        }
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
};

module.exports = connectDB;
