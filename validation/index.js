const Joi = require('joi');

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema, { abortEarly: false });
}

function validateLogin(user) {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema, { abortEarly: false });
}

function validateProfile(profile) {
  const schema = {
    user: Joi.object().required(),
    handle: Joi.string().required(),
    status: Joi.string().required(),
    skills: Joi.array().required(),
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    status: Joi.string().required(),
    bio: Joi.string(),
    github_username: Joi.string(),
    social: Joi.object().keys({
      facebook: Joi.string().uri(),
      linkedin: Joi.string().uri()
    })
  };

  return Joi.validate(profile, schema, { abortEarly: false });
}

function validateExperience(exp) {
  const schema = {
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    from: Joi.date(),
    to: Joi.date(),
    current: Joi.bool(),
    description: Joi.string()
  };

  return Joi.validate(exp, schema, { abortEarly: false });
}

function validateEducation(edu) {
  const schema = {
    school: Joi.string().required(),
    degree: Joi.string().required(),
    field_of_study: Joi.string().required(),
    from: Joi.date(),
    to: Joi.date(),
    current: Joi.bool(),
    description: Joi.string()
  };

  return Joi.validate(edu, schema, { abortEarly: false });
}

function validatePost(post) {
  const schema = {
    user: Joi.object().required(),
    text: Joi.string().required(),
    name: Joi.string(),
    avatar: Joi.string(),
    date: Joi.date()
  };

  return Joi.validate(post, schema, { abortEarly: false });
}

function validateComment(comment) {
  const schema = {
    user: Joi.object().required(),
    text: Joi.string().required(),
    name: Joi.string(),
    avatar: Joi.string(),
    date: Joi.date()
  };

  return Joi.validate(comment, schema, { abortEarly: false });
}

module.exports = {
  validateLogin,
  validateUser,
  validateProfile,
  validateExperience,
  validateEducation,
  validatePost,
  validateComment
};
