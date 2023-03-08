var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

function authToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';

  if (!token) {
    return res.status(401).json({
      errCode: 4,
      message: 'Not authorized',
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({
        errCode: 5,
        message: 'Forbidden',
      });
    }
    next();
  });
}

export { authToken };
