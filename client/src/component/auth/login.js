import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogin } from '../../redux/actions';
import { TextInput } from '../index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.auth.loginErrors) {
      return { errors: nextProps.auth.loginErrors };
    }

    if (nextProps.auth.isAuthenticate) {
      nextProps.history.push('/dashboard');
    }

    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.props.userLogin(user);
  };
  render() {
    const { email, password, errors } = this.state;

    return (
      <div className='row'>
        <div className='col-8 mx-auto'>
          <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className='display-3'>Login</h1>
            <p className='lead'>Sign in your DevConnector account</p>
            <form className='col-10' onSubmit={this.onSubmit}>
              <TextInput
                type={'email'}
                value={email}
                name={'email'}
                placeholder={'Email Address'}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextInput
                type={'password'}
                value={password}
                name={'password'}
                placeholder={'Password'}
                onChange={this.onChange}
                error={errors.password}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  userLogin: payload => dispatch(userLogin(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
