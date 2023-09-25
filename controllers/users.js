const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const User = require('../models/user');
const ConflictError = require('../utils/errors/conflictError');
const ValidationError = require('../utils/errors/validationError');
const {
  JWT_SECRET,
  SALT_ROUNDS,
} = require('../utils/config');
const {
  VALIDATION,
  CONFLICT,
  SIGN_IN_OK,
  SIGN_OUT_OK,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../utils/constants');

// create new user
const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({ ...req.body, password: hash });
    const { password, ...userWithoutPassword } = user.toObject();
    return res.status(HTTP_STATUS_CREATED).send({ data: userWithoutPassword });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(VALIDATION));
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError(CONFLICT));
    }
    return next(err);
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .status(HTTP_STATUS_OK)
      .send({ message: SIGN_IN_OK });
  } catch (err) {
    return next(err);
  }
};

// logout
const logout = async (req, res, next) => {
  try {
    return res
      .cookie('jwt', '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: true,
      })
      .status(HTTP_STATUS_OK)
      .send({ message: SIGN_OUT_OK });
  } catch (err) {
    return next(err);
  }
};

// get user info
const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { email, name } = user;
    return res.status(HTTP_STATUS_OK).send({ data: { email, name } });
  } catch (err) {
    return next(err);
  }
};

// update user info
const updateUserBio = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );

    return res.status(HTTP_STATUS_OK).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(VALIDATION));
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError(CONFLICT));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  getUserInfo,
  updateUserBio,
  login,
  logout,
};
