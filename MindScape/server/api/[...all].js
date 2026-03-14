const app = require('../src/app');

// Vercel Serverless Function entrypoint.
// This catch-all routes any request under `/api/*` to the Express app.
module.exports = (req, res) => app(req, res);

