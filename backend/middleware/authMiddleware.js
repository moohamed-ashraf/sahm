const jwt = require('jsonwebtoken');
const db = require('../config/db');

/**
 * Middleware to optionally verify JWT token and attach user info if valid
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const [rows] = await db.query(
        'SELECT user_id, user_name, user_email, user_role FROM User WHERE user_id = ?',
        [decoded.id]
      );

      if (rows.length > 0) {
        // Add user to request object if found
        req.user = rows[0];
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't throw error, just continue without user info
    }
  }

  // Always continue to next middleware/route handler
  next();
};

/**
 * Middleware to check if user is an admin (only if user is authenticated)
 */
const admin = (req, res, next) => {
  if (req.user &&  (req.user.user_role === 'admin')) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = {
  protect,
  admin
};