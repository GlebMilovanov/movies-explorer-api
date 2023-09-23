const INCORRECT_URL = 'Некорректный URL';
const SERVER_ERROR = 'На сервере произошла ошибка';
const UNAUTHORIZED = 'Неправильные почта или пароль';
const BAD_REQUEST = 'Переданы некорректные данные';
const NOT_FOUND = 'Страница не найдена';
const FORBIDDEN = 'Недостаточно прав';
const CONFLICT = 'Пользователь с таким email уже существует';

const urlPattern = /^https?:\/\/(www\.)?[a-z0-9\-_.]+\.[a-z]{2,}([-a-z0-9()@:%_+.~#?&/=]*)?$/i;

module.exports = {
  INCORRECT_URL,
  SERVER_ERROR,
  UNAUTHORIZED,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  CONFLICT,
  urlPattern,
};
