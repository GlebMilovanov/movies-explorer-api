const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('../utils/constants');
const User = require('../models/user');
const { ConflictError } = require('../utils/errors/conflictError');
const { ValidationError } = require('../utils/errors/validationError');
const { JWT_SECRET } = require('../utils/config');
const {
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  BAD_REQUEST,
  CONFLICT,
  AUTH_DONE,
  LOGOUT,
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
      return next(new ValidationError(BAD_REQUEST));
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
      .status(HTTP_STATUS_OK).send({ message: AUTH_DONE });
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
      }).status(HTTP_STATUS_OK).send({ message: LOGOUT });
  } catch (err) {
    return next(err);
  }
};

// get user info
const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(HTTP_STATUS_OK).send({ data: user });
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
      return next(new ValidationError(BAD_REQUEST));
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