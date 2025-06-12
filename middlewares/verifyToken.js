const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded.user ?? decoded.userObj; // use "userObj" as you used in jwt.sign
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(401).json({ stauus:'failed',message: 'Invalid or expired token' });
  }
};


module.exports = verifyToken;
