const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // if not token return 401 code
  if (!token) return res.status(401).json({ msg: 'Access denied'});

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;
