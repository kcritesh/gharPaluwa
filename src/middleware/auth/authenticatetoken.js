import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//function to Authenticate as a middleware

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log({ authHeader });
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User) => {
    if (err) return res.status(403).json({ message: err.message });
    req.User = User;
    next();
  });
}
