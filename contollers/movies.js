const mongoose = require('mongoose');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const Movie = require('../models/movie');
const { ValidationError } = require('../utils/errors/validationError');
const { NotFoundError } = require('../utils/errors/notFoundError');
const { ForbiddenError } = require('../utils/errors/forbiddenError');
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require('../utils/constants');

// get favourite movies
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.status(HTTP_STATUS_OK).send({ data: movies });
  } catch (err) {
    return next(err);
  }
};

// create movie
const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ owner: req.user._id, ...req.body });
    return res.status(HTTP_STATUS_CREATED).send({ data: movie });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(BAD_REQUEST));
    }
    return next(err);
  }
};

// delete movie
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(new NotFoundError(NOT_FOUND));
    if (movie.owner.toString() !== req.user._id) {
      return next(new ForbiddenError(FORBIDDEN));
    }
    await movie.deleteOne();
    return res.status(HTTP_STATUS_OK).send({ data: movie });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
