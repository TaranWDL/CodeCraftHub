// src/routes/userRoutes.js
// Purpose: Define user-related routes and mount controllers.
// Export only the router (no other exports).

const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// PUBLIC routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// PRIVATE routes (require Bearer token)
router.get('/profile', auth, getProfile);

module.exports = router;
