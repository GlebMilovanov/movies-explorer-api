const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режиссер" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Длительность" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год" должно быть заполнено'],
      minlength: [4, 'Минимальная длина поля "Год" - 4 символа'],
      maxlength: [4, 'Максимальная длина поля "Год" - 4 символа'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "Ссылка на постер" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Указана некорректная ссылка на постер',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Указана некорректная ссылка на трейлер',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "Ссылка на постер" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Указана некорректная ссылка на постер',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: [
        true,
        'Поле "Название фильма на русском" должно быть заполнено',
      ],
    },
    nameEN: {
      type: String,
      required: [
        true,
        'Поле "Название фильма на английском" должно быть заполнено',
      ],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
