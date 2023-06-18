const { celebrate, Joi } = require('celebrate');

const validationCreatUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/http(s)?:\/\/(www.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validationCreatUser,
};