const { json } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');



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

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(200).send(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
    });
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
  const { name, about, avatar, email, password, } = req.body;

/*   const { error } = validationCreatUser.validate(req.body);

  if (error) {
    // Ошибка валидации
    return res.status(400).send({ message: 'Invalid data for creating a user', error: error.details });
  } */
  bcrypt.hash(String(password), 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => res.status(200).send({ data: user.toJSON() }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send(err);
          } else if (err) {
            res.status(400).send({
              message: 'Invalid data for creating a user',
              err: err.message,
              stack: err.stack,
            });
          }
        });
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

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).send({ message: 'Enter the data' });
    return;
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('User not found'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');

            res.cookie('jwt', jwt, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            res.status(403).send({ message: 'password error' });
          }
        });
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  upDateUser,
  upDateUserAvatar,
  login,
  getUserInfo,
};