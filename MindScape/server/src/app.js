const express = require('express');
const cors = require('cors');
const journalRoutes = require('./routes/journalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

console.log("just before to enter backend function");

app.get('/', (req, res) => {
    res.status(200).json({ message: "Mindscape server is running 🚀" });
});

app.use('/api/journal', journalRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;