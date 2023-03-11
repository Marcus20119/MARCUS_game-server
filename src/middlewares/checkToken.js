var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

function checkToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  const accessToken = authorizationHeader
    ? authorizationHeader.split(' ')[1]
    : '';

  if (!accessToken || accessToken === 'undefined') {
    return res.status(401).json({
      message: 'accessToken is needed',
    });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden or outdated token',
      });
    }
    req.id = data.id;
    next();
  });
}

export { checkToken };
