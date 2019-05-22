const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const { Profile } = require('../../models');
const {
  validateProfile,
  validateExperience,
  validateEducation
} = require('../../validation');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user._id }).populate(
        'user',
        'name email avatar'
      );

      if (!profile) {
        return res.status(404).send('No profile found');
      }

      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Get profile by handle
 */
router.get('/handle/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    const profile = await Profile.findOne({ handle }).populate(
      'user',
      'name email avatar'
    );

    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.send(profile);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Get profile by user_id
 */
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const profile = await Profile.findOne({ user: user_id }).populate(
      'user',
      'name email avatar'
    );

    if (!profile) {
      return res.status(404).send('User not found');
    }

    res.send(profile);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Get all profile
 */
router.get('/all', async (req, res) => {
  try {
    const profile = await Profile.find().populate('user', 'name email avatar');

    res.send(profile);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Add experience
 */
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });

      if (!profile) {
        return res.status(404).send('Profile not found');
      }

      const { error } = validateExperience(req.body);

      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      profile.experience.unshift(req.body);
      profile = await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Remove experience
 */
router.delete(
  '/experience/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });

      if (!profile) {
        return res.status(404).send('Profile not found');
      }

      const { id } = req.params;
      const removeIndex = _.findIndex(profile.experience, exp => exp._id == id);

      if (removeIndex !== -1) {
        profile.experience.splice(removeIndex, 1);
        profile = await profile.save();
      }

      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Add education
 */
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });

      if (!profile) {
        return res.status(404).send('Profile not found');
      }

      const { error } = validateEducation(req.body);

      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      profile.education.unshift(req.body);
      profile = await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Remove education
 */
router.delete(
  '/education/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });

      if (!profile) {
        return res.status(404).send('Profile not found');
      }

      const { id } = req.params;
      const removeIndex = _.findIndex(profile.education, exp => exp._id == id);

      if (removeIndex !== -1) {
        profile.education.splice(removeIndex, 1);
        profile = await profile.save();
      }

      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Register profile
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Validate body
    const profileFields = req.body;
    profileFields.user = req.user;
    const { error } = validateProfile(profileFields);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { _id: profile._id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // Save
        // Check if handle exist
        const handle = await Profile.findOne({ handle: profileFields.handle });

        if (handle) {
          return res.status(400).send('Handle already exist');
        }

        profile = new Profile(profileFields);
        profile = await profile.save();
      }

      res.send(profile);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

/**
 * Remove profile
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOneAndRemove({ user: req.user._id });
      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

module.exports = router;
