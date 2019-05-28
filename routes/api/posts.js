const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const { Post } = require('../../models');
const { validatePost, validateComment } = require('../../validation');

const router = express.Router();

/**
 * Add Post
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let post = req.body;
    post.user = req.user._id;
    const { error } = validatePost(post);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      post = new Post(post);
      post = await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Get all post
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email avatar');

    res.send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Get post by id
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.findById(id)
      .populate('user', '_id name email')
      .populate('comment.user', '_id name email');

    res.send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Delete post by id
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      let post = await Post.findById(id);

      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(401).send('Unauthorized');
      }

      post = await post.deleteOne();
      res.send(post);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

/**
 * Like post
 */
router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { postId } = req.params;

    try {
      let post = await Post.findById(postId);

      if (!post) {
        return res.status(404).send('No post found');
      }

      const likedIndex = _.findIndex(
        post.like,
        like => like.user.toString() === req.user._id.toString()
      );

      if (likedIndex !== -1) {
        post.like.splice(likedIndex, 1); // Dislike
      } else {
        post.like.unshift({ user: req.user._id }); // Like
      }

      post = await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

/**
 * Add comment by post_id
 */
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { postId } = req.params;
    const comment = req.body;
    comment.user = req.user._id;

    const { error } = validateComment(comment);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      let post = await Post.findById(postId);

      if (!post) {
        return res.status(404).send('No post found');
      }

      post.comment.unshift(comment);
      post = await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

/**
 * Delete comment
 */
router.delete(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { postId } = req.params;
    const { commentId } = req.body;

    try {
      let post = await Post.findById(postId);

      if (!post) {
        return res.status(404).send('No post found');
      }

      const indexRemove = _.findIndex(
        post.comment,
        comment => comment._id.toString() === commentId
      );

      if (indexRemove === -1) {
        return res.status(404).send('Comment not found');
      }

      const isAuthor =
        post.comment[indexRemove].user.toString() === req.user._id.toString();

      if (!isAuthor) {
        return res.status(401).send('Not authorize');
      }

      post.comment.splice(indexRemove, 1);

      post = await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

module.exports = router;
