const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from the repo's existing location (`server/src/.env`).
// dotenv defaults to `process.cwd()/.env`, which is usually `server/.env` when running `node src/server.js`.
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : path.join(process.cwd(), '.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
    console.error('Failed to connect to database', err);
    process.exit(1);
});
