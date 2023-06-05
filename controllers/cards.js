const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({
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
    .catch((err) => res.status(500).send({
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
    .catch((err) => res.status(500).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },)
    .catch((err) => res.status(500).send({
      message: 'Internal server error',
      err: err.message,
      stack: err.stack,
    }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
    .catch((err) => res.status(500).send({
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