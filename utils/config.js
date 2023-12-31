require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb://localhost:27017/bitfilmsdb';
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const SALT_ROUNDS = 10;
const urlPattern = /^https?:\/\/(www\.)?[a-z0-9\-_.]+\.[a-z]{2,}([-a-z0-9()@:%_+.~#?&/=]*)?$/i;

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  MONGO_OPTIONS,
  SALT_ROUNDS,
  urlPattern,
};
