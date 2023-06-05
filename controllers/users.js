const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(400).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      }));
};

const getUsersById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const ERROR_CODE = 400;
        return res.status(ERROR_CODE).send({
          message: 'User not found',
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const createUser = (req, res) => {
  const { name, about } = req.body;

  if (name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
    return res.status(400).send({
      message: 'Invalid data for creating a user',
      error: 'Name and about should be between 2 and 30 characters long',
    });
  }

  User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      res.status(ERROR_CODE).send({
        message: 'Invalid data for creating a user',
        err: err.message,
        stack: err.stack,
      });
    });
};

const upDateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((userInfo) => {
      if (!userInfo) {
        const ERROR_CODE = 400;
        return res.status(ERROR_CODE).send({
          message: 'User not found',
        });
      }
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      res.status(ERROR_CODE).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const upDateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((userInfo) => {
      if (!userInfo) {
        const ERROR_CODE = 404;
        return res.status(ERROR_CODE).send({
          message: 'User not found',
        });
      }
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      res.status(ERROR_CODE).send({
        message: 'Invalid data for updating user avatar',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  upDateUser,
  upDateUserAvatar,
};