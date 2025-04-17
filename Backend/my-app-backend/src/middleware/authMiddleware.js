// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Simplified middleware for testing - allows all requests (temporary)
const authMiddleware = (req, res, next) => {
  // For testing purposes, allow all requests without token verification
  console.log('Auth middleware bypassed for testing');
  req.user = { id: 1, role: 'admin' }; // Mock user data
  next();

  // Uncomment when implementing real auth:
  /*
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with actual secret
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
  */
};

module.exports = authMiddleware;
