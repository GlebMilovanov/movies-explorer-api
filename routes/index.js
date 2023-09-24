const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validations/userValidations');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.post('/logout', logout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
