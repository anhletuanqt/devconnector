const express = require('express');
const gravatar = require('gravatar');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../../models');
const { validateLogin, validateUser } = require('../../validation');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users api');
});

router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const { error } = validateUser(req.body);

  if (error) {
    const errors = {};
    error.details.forEach(e => {
      errors[e.path] = e.message;
    });

    return res.status(400).send(errors);
  }
  try {
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).send({ msg: 'Email already exist' });
    }

    const avatar = gravatar.url(email, { s: '80', r: 'pg', d: '404' });
    user = new User({
      name,
      email,
      password,
      avatar
    });

    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email', 'date']));
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateLogin(req.body);

  if (error) {
    const errors = {};
    error.details.forEach(e => {
      errors[e.path] = e.message;
    });

    return res.status(400).send(errors);
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).send({ email: 'email not found' });
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      return res.status(400).send({ password: 'Password incorrect' });
    }

    return res.send({ token: `Bearer ${user.generateToken()}` });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Get current user
 * Client: send header{
 *  Authorization: 'Bearer token'
 * }
 */
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

function findUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = router;
