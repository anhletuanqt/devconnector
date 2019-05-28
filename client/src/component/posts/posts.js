import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPost, getAllPost, deletePost, likePost } from '../../redux/actions';
import PostForm from './postForm';
import PostItem from './postItem';

class Posts extends Component {
  state = { post: '', errors: null };

  static getDerivedStateFromProps(nexProps) {
    const { post } = nexProps;
    if (post.errors) {
      return { errors: post.errors };
    }
    return null;
  }

  componentDidMount() {
    this.props.getAllPost();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addPost({ text: this.state.post });
    this.setState({ post: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDeletePost = id => {
    this.props.deletePost(id);
  };

  onLike = id => {
    this.props.likePost(id);
  };

  isLike = (post, user_id) => {
    let isLiked = false;
    for (let i of post.like) {
      if (i.user === user_id) {
        isLiked = true;
        break;
      }
    }

    return isLiked;
  };

  render() {
    const { post, errors } = this.state;
    const { auth } = this.props;

    return (
      <div className='row'>
        <div className='col-12'>
          <PostForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={post}
            error={errors}
          />
        </div>
        <div className='col-12'>
          {this.props.post.posts.map(p => (
            <PostItem
              key={p._id}
              user={auth.user}
              post={p}
              onDeletePost={this.onDeletePost}
              onLike={this.onLike}
              isLiked={this.isLike(p, auth.user._id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  addPost: payload => dispatch(addPost(payload)),
  getAllPost: () => dispatch(getAllPost()),
  deletePost: id => dispatch(deletePost(id)),
  likePost: id => dispatch(likePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
