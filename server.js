const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// Router
const { usersRouter, profileRouter, postsRouter } = require('./routes/api');
// Config
const { passportConfig } = require('./configs');

const app = express();

/**
 * DB
 */
mongoose
  .connect('mongodb://localhost/devconnector', { useNewUrlParser: true })
  .then(() => console.log('db connected'))
  .catch(() => console.log('db connect with error'));

/**
 * Middleware
 */
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

/**
 * Passport
 */
app.use(passport.initialize());
passportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening port ${port}`);
});
