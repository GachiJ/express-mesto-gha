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
    .orFail(new Error('User not found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message == 'User not found') {
        res.status(404).send({ message: 'User not found' });
      } else if (err.name = 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const createUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about || name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
    return res.status(400).send({
      message: 'Invalid data for creating a user',
      error: 'Name and about should be between 2 and 30 characters long',
    });
  }

  User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name == 'ValidationError') {
        res.status(400).send(err);
      } else if (err) {
        res.status(400).send({
          message: 'Invalid data for creating a user',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const upDateUser = (req, res) => {

  const { name, about } = req.body;

  if (!name || !about || name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
    return res.status(400).send({
      message: 'Invalid data for creating a user',
      error: 'Name and about should be between 2 and 30 characters long',
    });
  }

  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('User not found'))
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.message == 'User not found') {
        res.status(404).send({ message: 'User not found' });
      } else if (err.name = 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const upDateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('User not found'))
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.message == 'User not found') {
        res.status(404).send({ message: 'User not found' });
      } else if (err.name = 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  upDateUser,
  upDateUserAvatar,
};