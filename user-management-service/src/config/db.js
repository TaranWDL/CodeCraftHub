// src/config/db.js
// Purpose: Provide a single helper to connect to MongoDB using Mongoose.
//
// Export shape: CommonJS default export (module.exports = connectDB).
// Usage from src/app.js: const connectDB = require('./config/db');

const mongoose = require('mongoose');

/**
 * Connect to MongoDB using a connection string from process.env.MONGO_URI.
 * Exits the process if the initial connection fails (typical for labs).
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set. Add it to your .env file.');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8+ uses sensible defaults; options included for clarity.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    // In labs it’s OK to exit; in prod you might retry/backoff
    process.exit(1);
  }
};

module.exports = connectDB;
