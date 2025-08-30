const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied.' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
module.exports = authMiddleware;