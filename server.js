const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 * DB
 */
mongoose
  .connect('mongodb://localhost/devconnector', { useNewUrlParser: true })
  .then(() => console.log('db connected'))
  .catch(() => console.log('db connect with error'));

/**
 * Routers
 */
const { usersRouter, profileRouter, postsRouter } = require('./routes/api');

/**
 * Middleware
 */
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening port ${port}`);
});
