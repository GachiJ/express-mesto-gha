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
  console.log(owner)

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(400).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => res.status(200).send({
      card,
      message: "Card delete by id",
    }))
    .catch((err) => res.status(400).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send({
      message: 'Invalid card ID',
    });
  }

  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((updatedCard) => res.status(200).send({data: updatedCard}))
    .catch((err) => res.status(400).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const deleteLike = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send({
      message: 'Invalid card ID',
    });
  }

  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
    .then((updatedCard) => res.status(200).send({data: updatedCard}))
    .catch((err) => res.status(400).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLike,
};