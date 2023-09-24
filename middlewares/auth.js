const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const { JWT_SECRET } = require('../utils/config');
const { UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;

  return next();
};
