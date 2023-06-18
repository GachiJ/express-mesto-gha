const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationCreatUser } = require('../meddlwares/validation')




const { getUsers, getUsersById, createUser, upDateUser, upDateUserAvatar, login, getUserInfo, } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.patch('/users/me', upDateUser);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', upDateUserAvatar);

router.post('/signin', login);

router.post('/signup', validationCreatUser, createUser, (err, req, res, next) => {
  // Обработчик ошибок
  res.status(400).json({ message: 'Invalid data for creating a user', error: err });
});

module.exports = router;