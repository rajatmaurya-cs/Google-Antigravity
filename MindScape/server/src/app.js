const express = require('express');
const cors = require('cors');
const journalRoutes = require('./routes/journalRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

console.log("just before to enter backend function");

app.get('/', (req, res) => {
    res.status(200).json({ message: "Mindscape server is running 🚀" });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        ok: true,
        db: {
            readyState: mongoose.connection.readyState
        }
    });
});

app.use('/api/journal', journalRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const message = err?.message || 'Internal Server Error';
    const isDbBufferTimeout =
        typeof message === 'string' && message.includes('buffering timed out');
    const isMongooseSelectionError = err?.name === 'MongooseServerSelectionError';

    const status = err.status || (isDbBufferTimeout || isMongooseSelectionError ? 503 : 500);
    res.status(status).json({ error: message });
});

module.exports = app;
