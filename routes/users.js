const router = require('express').Router();
const { getUserInfo, updateUserBio } = require('../controllers/users');
const { validateUserBio } = require('../utils/validations/userValidations');

router.get('/me', getUserInfo);
router.patch('/me', validateUserBio, updateUserBio);

module.exports = router;
