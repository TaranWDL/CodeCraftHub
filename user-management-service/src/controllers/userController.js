// src/controllers/userController.js
// Purpose: Handle HTTP logic for auth-related routes (register/login/profile).

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * @route   POST /api/users/register
 * @desc    Create a new user (hash password) and return basic user info.
 * @access  Public
 */
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email, and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error('registerUser error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * @route   POST /api/users/login
 * @desc    Validate credentials and return a JWT token.
 * @access  Public
 */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('loginUser error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * @route   GET /api/users/profile
 * @desc    Return the authenticated user's profile.
 * @access  Private (requires Authorization: Bearer <token>)
 */
async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { registerUser, loginUser, getProfile };
