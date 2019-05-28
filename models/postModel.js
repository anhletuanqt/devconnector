const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  like: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comment: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        require: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.post('save', async function(doc) {
  await doc
    .populate('user', '_id name email')
    .populate({
      path: 'comment.user',
      select: '_id name email'
    })
    .execPopulate();
});

const Post = mongoose.model('Post', PostSchema);

module.exports.Post = Post;
