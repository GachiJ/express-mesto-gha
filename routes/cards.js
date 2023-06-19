const router = require('express').Router();
const { getCards, createCard, deleteCardById, likeCard, deleteLike } = require('../controllers/cards');
const { validationCreateCard } = require('../meddlwares/validation')

router.get('/cards', getCards);

router.post('/cards', validationCreateCard, createCard);

router.delete('/cards/:id', deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;