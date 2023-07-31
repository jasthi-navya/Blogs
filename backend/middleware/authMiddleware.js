const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const User = require('../models/User_schema');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  

  try {
    console.log('try');
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
