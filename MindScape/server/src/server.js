const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from the repo's existing location (`server/src/.env`).
// dotenv defaults to `process.cwd()/.env`, which is usually `server/.env` when running `node src/server.js`.
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : path.join(process.cwd(), '.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Midscape server is running");
});

connectDB().catch((err) => {
  console.error('Failed to connect to database (will keep serving non-DB routes)', err);
});
