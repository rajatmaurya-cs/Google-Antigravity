const express = require('express');
const cors = require('cors');
const journalRoutes = require('./routes/journalRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
console.log("just before to enter backend function");

app.use('/', (req, res, next) => {
    console.log("Midscape server is running");
    next();
});

app.use('/api/journal', journalRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;
