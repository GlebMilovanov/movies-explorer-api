const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { PORT, DATABASE_URL, MONGO_OPTIONS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimit = require('./middlewares/rateLimit');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(
  cors({
    origin: 'https://movies-explorer.gleb.nomoredomainsrocks.ru',
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(rateLimit);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DATABASE_URL, MONGO_OPTIONS);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
