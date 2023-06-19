const router = require('express').Router();
const { validationUpdateUser, validationUserId } = require('../meddlwares/validation')


const { getUsers, getUsersById, upDateUser, upDateUserAvatar, getUserInfo, } = require('../controllers/users');


router.get('/users', getUsers);

router.get('/users/:id', validationUserId, getUsersById);

router.patch('/users/me', validationUpdateUser, upDateUser);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', validationUpdateUser, upDateUserAvatar);



module.exports = router;