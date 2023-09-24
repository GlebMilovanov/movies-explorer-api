const VALIDATION = 'Переданы некорректные данные';
const NOTFOUND = 'Запрашиваемый ресурс не найден';
const FORBIDDEN = 'Недостаточно прав для выполнения операции';
const CONFLICT = 'Пользователь с таким email уже существует';
const SIGN_IN_OK = 'Авторизация прошла успешно';
const SIGN_OUT_OK = 'Выход из аккаунта прошел успешно';
const UNAUTHORIZED = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';
const INVALID_URL = 'Некорректный URL';
const INVALID_EMAIL = 'Некорректный email';
const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports = {
  VALIDATION,
  NOTFOUND,
  FORBIDDEN,
  CONFLICT,
  SIGN_IN_OK,
  SIGN_OUT_OK,
  UNAUTHORIZED,
  SERVER_ERROR,
  INVALID_URL,
  INVALID_EMAIL,
  WRONG_EMAIL_OR_PASSWORD,
  MONGO_DUPLICATE_ERROR_CODE,
};
