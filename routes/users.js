const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationCreatUser, validationLogin } = require('../meddlwares/validation')
const auth = require('../meddlwares/auth')




const { getUsers, getUsersById, createUser, upDateUser, upDateUserAvatar, login, getUserInfo, } = require('../controllers/users');

router.post('/signin', validationLogin, login);

router.post('/signup', validationCreatUser, createUser);

router.use(auth);





module.exports = router;