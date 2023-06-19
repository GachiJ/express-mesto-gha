const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const validationUrl = (req, res, url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  res.status(404).send({ message: 'incorrect data' });
};


const validationCreatUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+#)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+)$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validationUpdateAvatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+#)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+)$/),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).pattern(/^[0-9a-fA-F]{24}$/),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/http(s)?:\/\/(www.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/),
  }),
});

const validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/[a-z][0-9]+/),
  }),
});



module.exports = {
  validationCreatUser,
  validationLogin,
  validationUpdateUser,
  validationCreateCard,
  validationUserId,
  validationCardById,
  validationUpdateAvatarUser,
};