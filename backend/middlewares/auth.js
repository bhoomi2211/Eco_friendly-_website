const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');
require('dotenv').config();

// Middleware to verify JWT token and role
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB to confirm existence and role
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // attach full user object to request
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
