import React from 'react';
import moment from 'moment';

import defaultImg from '../../img/images.png';
import './post.scss';

export default function commentItem({ comment }) {
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
          <p className='text-center'>{comment.user.name}</p>
        </div>
        <div className='col-md-10 comment-item'>
          <p className='lead'>{comment.text}</p>
          <p className='lead'>{moment(comment.date).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
