import React from 'react';
import { Link } from 'react-router-dom';

import './component.scss';

export default function landing() {
  return (
    <div className='landing'>
      <div className='dark-overlay d-flex flex-column justify-content-center'>
        <div className='container mt-n5'>
          <div className='row'>
            <div className='col-12 text-center h-100 text-light align-self-center'>
              <h1 className='display-3 mb-4'>Developer Connector</h1>
              <p className='lead'>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <Link className='btn btn-info mr-1' to='/register'>
                Sign Up
              </Link>
              <Link className='btn btn-light ml-1 text-dark px-3' to='/login'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
