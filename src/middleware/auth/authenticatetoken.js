/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

// function to Authenticate as a middleware

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User) => {
    if (err) return res.status(403).json({ message: err.message });
    req.User = User;
    next();
    return null;
  });
  return null;
}
