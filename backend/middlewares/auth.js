const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided.' 
        });
    }

    try {
        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        // Add user data from token to request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ 
            message: 'Invalid token.' 
        });
    }
};

module.exports = verifyToken;