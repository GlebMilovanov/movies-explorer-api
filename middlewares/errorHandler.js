const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { SERVER_ERROR } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? SERVER_ERROR : message,
  });

  next();
};
