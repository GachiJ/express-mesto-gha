const router = require('express').Router();
const { getUsers, getUsersById, createUser, upDateUser, upDateUserAvatar, login, getUserInfo, } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.patch('/users/me', upDateUser);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', upDateUserAvatar);

router.post('/signin', login);

router.post('/signup', createUser);

module.exports = router;