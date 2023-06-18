const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { errors } = require('celebrate');

const cookieParser = require('cookie-parser');



const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(errors());
app.use(cookieParser());

app.use(routes);
app.listen(3000, () => {
  console.log("Слушаю 3000 порт");
});
