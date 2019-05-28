import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../../img/images.png';

class Header extends Component {
  render() {
    const { profile } = this.props;
    let socials = null;
    if (profile.social && profile.social.length > 0) {
      socials = profile.social.map(slink => (
        <a className='text-white p-2' href={slink}>
          <i className='fas fa-globe fa-2x' />
        </a>
      ));
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-info text-white mb-3'>
            <div className='row'>
              <div className='col-4 col-md-3 m-auto'>
                <img
                  className='rounded-circle d-block mx-auto'
                  width={100}
                  height={100}
                  src={defaultImg}
                  alt=''
                />
              </div>
            </div>
            <div className='text-center'>
              <h1 className='display-4 text-center'>
                {profile && profile.user && profile.user.name}
              </h1>
              <p className='lead text-center'>{`${profile.status} at ${
                profile.company
              }`}</p>
              <p>{profile.location}</p>
              <p>
                {/* <a className='text-white p-2' href='#'>
                  <i className='fas fa-globe fa-2x' />
                </a> */}
                {/* <a className='text-white p-2' href='#'>
                  <i className='fab fa-twitter fa-2x' />
                </a> */}
                {profile.social && profile.social.facebook && (
                  <a className='text-white p-2' href={profile.social.facebook}>
                    <i className='fab fa-facebook fa-2x' />
                  </a>
                )}
                {profile.social && profile.social.linkedin && (
                  <a className='text-white p-2' href={profile.social.linkedin}>
                    <i className='fab fa-linkedin fa-2x' />
                  </a>
                )}
                {/* <a className='text-white p-2' href='#'>
                  <i className='fab fa-instagram fa-2x' />
                </a> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
