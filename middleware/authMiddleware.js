import jwt from'jsonwebtoken';
import  dotenv from "dotenv";

dotenv.config("../.env");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next(); 
  });
}

export default authMiddleware;
