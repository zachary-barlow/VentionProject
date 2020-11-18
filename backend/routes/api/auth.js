const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('token');
  if(!token) return res.status(401).send('Forbidden');

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}