import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import defaultImg from '../../img/images.png';

export default function postItem({
  post,
  user,
  onDeletePost,
  onLike,
  isLiked
}) {
  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block mx-auto'
              src={defaultImg}
              alt=''
              width={100}
              height={100}
            />
          </a>
          <br />
          <p className='text-center'>{post.user.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          <p className='lead'>{moment(post.date).fromNow()}</p>
          <button
            type='button'
            className='btn btn-light mr-1'
            onClick={() => onLike(post._id)}
          >
            <i
              className={` fas  ${
                isLiked ? 'text-info' : 'text-secondary'
              } fa-thumbs-up`}
            />
            <span className='badge badge-light'>{post.like.length}</span>
          </button>
          <button type='button' className='btn btn-light mr-1'>
            <i className='text-secondary fas fa-thumbs-down' />
          </button>
          {user && (
            <Link to={`post/${post._id}`} className='btn btn-info mr-1'>
              Comments
            </Link>
          )}
          {user && user._id === post.user._id && (
            <button
              type='button'
              className='btn btn-danger mr-1'
              onClick={() => onDeletePost(post._id)}
            >
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
