const mongoose = require('mongoose');

let connectPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection;

    if ((process.env.NODE_ENV === 'production' || process.env.VERCEL) && !process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not set. Configure a hosted MongoDB (e.g., Atlas) for production.');
    }

    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_journal';

    if (!connectPromise) {
        connectPromise = mongoose
            .connect(mongoUri, {
                serverSelectionTimeoutMS: 10_000,
                connectTimeoutMS: 10_000
            })
            .then((conn) => {
                console.log(`MongoDB Connected: ${conn.connection.host}`);
                return conn.connection;
            })
            .finally(() => {
                connectPromise = null;
            });
    }

    return connectPromise;
};

module.exports = connectDB;
