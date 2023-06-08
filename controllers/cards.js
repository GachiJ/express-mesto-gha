const Card = require('../models/card');
const mongoose = require('mongoose');
const ERROR_CODE = 400;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name == 'ValidationError') {
        res.status(400).send(err);
      } else if (err) {
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const deleteCardById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      message: 'Invalid card ID',
    });
  }

  Card.findByIdAndDelete(req.params.id)
    .orFail(new Error('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.message == 'Card not found') {
        res.status(400).send({ message: 'Card not found' })
        return;
      }
      res.status(400).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(400).send({
      message: 'Invalid card ID',
    });
  }

  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .orFail(new Error('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.message == 'Card not found') {
        res.status(400).send({ message: 'Card not found' })
        return;
      }
      res.status(400).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const deleteLike = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(400).send({
      message: 'Invalid card ID',
    });
  }

  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
    .orFail(new Error('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.message == 'Card not found') {
        res.status(400).send({ message: 'Card not found' })
        return;
      }
      res.status(400).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLike,
};