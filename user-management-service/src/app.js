/**
 * File: src/app.js
 * Purpose: Application entrypoint — loads env, connects to Mongo, sets up Express, mounts routes, and starts the server.
 * Notes: Thoroughly commented for lab clarity. No functional trickery.
 */

// 1) Load environment variables ASAP
require('dotenv').config();

// 2) Import libs & local modules (CommonJS)
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');          // ← correct relative path (from src/)
const userRoutes = require('./routes/userRoutes');  // user endpoints

// 3) Create the Express app and apply basic middlewares
const app = express();
app.use(cors());               // Allow cross-origin requests (handy in labs)
app.use(express.json());       // Parse JSON request bodies
app.use(morgan('dev'));        // Log HTTP requests to console

// Simple health endpoint for connectivity checks
app.get('/health', (_req, res) => res.send('ok'));

// 4) Mount feature routes under a base path
app.use('/api/users', userRoutes);

// 5) Read PORT from env (default 5000) and start server after DB connection
const PORT = process.env.PORT || 5000;

// Start server immediately so /health is available, then connect DB in background
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to DB (log and exit on failure per lab-friendly behavior)
connectDB();

module.exports = app; // Export for testing if needed
