// src/middlewares/authMiddleware.js
// Purpose: Verify JWT from Authorization header and attach user id to req.

const jwt = require('jsonwebtoken');

/**
 * Expected header format:
 *   Authorization: Bearer <token>
 */
function authMiddleware(req, res, next) {
  const auth = req.header('Authorization');
  const token = auth && auth.split(' ')[0] === 'Bearer' ? auth.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    // Attach user id for downstream handlers
    req.userId = decoded.sub;
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
