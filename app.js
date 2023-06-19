const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { validationCreatUser, validationLogin } = require('./meddlwares/validation')
const auth = require('./meddlwares/auth')
const { createUser, login, } = require('./controllers/users');

const cookieParser = require('cookie-parser');



const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(cookieParser());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreatUser, createUser);
app.use(auth);
app.use(routes);
app.use(errors());
app.listen(3000, () => {
  console.log("Слушаю 3000 порт");
});
