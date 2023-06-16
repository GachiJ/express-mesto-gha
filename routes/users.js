const router = require('express').Router();


const { getUsers, getUsersById, createUser, upDateUser, upDateUserAvatar, login, getUserInfo, } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.patch('/users/me', upDateUser);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', upDateUserAvatar);

router.post('/signin', login);

router.post('/signup', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
}), createUser);

module.exports = router;