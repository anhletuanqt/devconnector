const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

// Router
const { usersRouter, profileRouter, postsRouter } = require('./routes/api');
// Config
const { passportConfig } = require('./configs');

const app = express();

/**
 * DB
 */
// mongoose
//   .connect('mongodb://localhost/devconnector', { useNewUrlParser: true })
//   .then(() => console.log('db connected'))
//   .catch(() => console.log('db connect with error'));
// mongodb+srv://anhletuanqt:root@cluster0-exuxh.mongodb.net/test?retryWrites=true
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('db connected'))
  .catch(err => console.log('db connect with error: ', err));

/**
 * Middleware
 */
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

/**
 * Passport
 */
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening port ${port}`);
});

// const https = require('https');
// const fs = require('fs');
// Use https
// https
//   .createServer(
//     {
//       key: fs.readFileSync('server.key'),
//       cert: fs.readFileSync('server.cert')
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`server listening port ${port}`);
//   });

// Deploy
/**
 * heroky login
 * heroky create
 * heroku git:remote -a glacial-coast-51821 (deploy tab heroku website)
 */

// Client
/**
 * cd client
 * npm run build
 */
