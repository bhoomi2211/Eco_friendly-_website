// middlewares/isAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

const isAdmin = async (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    // Fetch user from DB
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    // Attach user to request for further use
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = isAdmin;
