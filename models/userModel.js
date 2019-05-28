const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isNew || !user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Generate token
 */
UserSchema.methods.generateToken = function() {
  const user = this;
  const { _id, email, name, date, avatar } = user;
  return jwt.sign(
    {
      _id,
      name,
      email,
      avatar,
      date
    },
    'MERN',
    { expiresIn: '1h' }
  );
};

/**
 * Compare password
 * @param password
 */
UserSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
