const router = require('express').Router();
const { getUsers, getUsersById, createUser, upDateUser, upDateUserAvatar } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.post('/users', createUser);

router.patch('/users/me', upDateUser);

router.patch('/users/me/avatar', upDateUserAvatar);

module.exports = router;