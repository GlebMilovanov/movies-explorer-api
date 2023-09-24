const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const urlPattern = /^https?:\/\/(www\.)?[a-z0-9\-_.]+\.[a-z]{2,}([-a-z0-9()@:%_+.~#?&/=]*)?$/i;

module.exports = {
  SALT_ROUNDS,
  MONGO_DUPLICATE_ERROR_CODE,
  urlPattern,
};
