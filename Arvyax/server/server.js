import 'dotenv/config';
import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🚀 AI Journal Server Running          ║
║   📍 http://localhost:${PORT}          ║
║   🗓️  Environment: ${process.env.NODE_ENV || 'development'}    ║
╚════════════════════════════════════════╝
      `);
    });

    server.on('error', (error) => {
      if (error?.code === 'EADDRINUSE') {
        console.error(`✗ Port ${PORT} is already in use. Set PORT in .env (e.g. PORT=5001) or stop the other process.`);
        process.exit(1);
      }
      console.error('Failed to start server:', error?.message || error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
