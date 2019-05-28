import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost, likePost, addComment } from '../../redux/actions';
import PostItem from './postItem';
import CommentForm from './commentForm';
import CommentItem from './commentItem';

class Post extends Component {
  state = {
    comment: ''
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.getPost(id);
  }

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

  onLike = id => {
    this.props.likePost(id);
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { comment } = this.state;
    this.props.addComment({ id, body: { text: comment } });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { post, auth } = this.props;
    const { comment } = this.state;
    if (!post) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div className='row '>
          <div className='col-12 my-4'>
            <Link to='/posts' className='btn btn-info'>
              Back to posts
            </Link>
          </div>
          <div className='col-12'>
            <PostItem
              post={post}
              isLiked={this.isLike(post, auth.user._id)}
              onLike={this.onLike}
            />
          </div>
          <div className='col-12'>
            <CommentForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              value={comment}
              // error={errors}
            />
          </div>
          <div className='col-12'>
            {post.comment.map(cmt => (
              <CommentItem key={cmt._id} comment={cmt} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.post,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
  likePost: id => dispatch(likePost(id)),
  addComment: payload => dispatch(addComment(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
