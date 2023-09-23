const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { PORT, DATABASE_URL, MONGO_OPTIONS } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(DATABASE_URL, MONGO_OPTIONS);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
