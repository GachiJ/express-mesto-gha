const router = require('express').Router();



const { getUsers, getUsersById, upDateUser, upDateUserAvatar, getUserInfo, } = require('../controllers/users');


router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.patch('/users/me', upDateUser);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', upDateUserAvatar);



module.exports = router;