const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { PORT, DATABASE_URL, MONGO_OPTIONS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimit } = require('./middlewares/rateLimit');
const { errorHandler } = require('./middlewares/errorHandler');
const { router } = require('./routes/index');

const app = express();
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(DATABASE_URL, MONGO_OPTIONS);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
