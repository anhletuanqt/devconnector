import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuthToken } from '../utils';
import { userLogout } from '../redux/actions';
import defaultUser from '../img/images.png';

class Navbar extends React.Component {
  logOut = () => {
    setAuthToken(false);
    localStorage.removeItem('token');
    this.props.userLogout();
    this.props.history.push('/login');
  };

  render() {
    const { isAuthenticate } = this.props.auth;
    const guessLink = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );
    const authLink = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/posts'>
            Posts
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <img
            src={defaultUser}
            alt='Flowers in Chania'
            className='circle'
            style={{ width: '40px', height: '40px', borderRadius: '20px' }}
          />
        </li>
        <li className='nav-item' onClick={this.logOut}>
          <Link className='nav-link' to='/register'>
            Logout
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className='navbar navbar-expand-lg navbar-dark bg-dark'
        style={{ height: '6vh' }}
      >
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            DevConnector
          </Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/profile'>
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticate ? authLink : guessLink}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
