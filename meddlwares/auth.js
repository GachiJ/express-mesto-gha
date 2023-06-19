const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {



  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
