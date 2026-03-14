const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Local/dev convenience: load `server/.env` if present.
// On Vercel, set env vars in Project Settings instead.
const serverEnvPath = path.join(process.cwd(), 'server', '.env');
dotenv.config({ path: fs.existsSync(serverEnvPath) ? serverEnvPath : undefined });

const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({
      error: 'Backend failed to start',
      message: err?.message || String(err),
    });
  }
};

