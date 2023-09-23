const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../utils/validations/userValidations');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
const { NOT_FOUND } = require('../utils/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.get('/logout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
