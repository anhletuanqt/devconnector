import React from 'react';
import { Link } from 'react-router-dom';

import defaultImg from '../../img/images.png';

export default function ProfileItem({ profile }) {
  return (
    <div className='row bg-light py-4 mb-4 rounded'>
      <div className='col-12 col-md-6'>
        <div className='row'>
          <div className='col-4 mx-auto'>
            <img
              src={defaultImg}
              width={100}
              height={100}
              className='d-block mx-auto rounded-circle'
            />
          </div>
          <div className='col-8'>
            <p className='lead mb-0'>{profile.user.name}</p>
            <p>{profile.company}</p>
            <Link to={`/profile/${profile.user._id}`} className='btn btn-info'>
              View Profile
            </Link>
          </div>
        </div>
      </div>
      <div className='col-12 col-md-6'>
        <div className='col-8'>
          <h1>Skills set</h1>
        </div>
        <div className='col-12'>
          <ul className='list-inline'>
            {profile.skills.map(skill => (
              <li key={skill} className='list-inline-item'>
                <p className='p-2 rounded bg-success'>
                  {' '}
                  <i className='fas fa-check' /> {skill}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
