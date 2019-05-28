import React from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/actions';
import { TextInput } from '../index';
class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.errors) {
      return {
        ...prevState,
        ...nextProps.auth
      };
    }

    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;

    const user = {
      name,
      email,
      password
    };

    this.props.register(user, this.props.history);
  };
  render() {
    const { name, email, password, confirmPassword, errors } = this.state;

    return (
      <div className='row'>
        <div className='col-8 mx-auto'>
          <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className='display-3'>Sign Up {this.state.age}</h1>
            <p className='lead'>Create your DevConnector account</p>
            <form className='col-10' onSubmit={this.onSubmit}>
              <TextInput
                type={'text'}
                value={name}
                name={'name'}
                placeholder={'Name'}
                onChange={this.onChange}
                error={errors.name}
              />
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
              <TextInput
                type={'password'}
                value={confirmPassword}
                name={'confirmPassword'}
                placeholder={'Confirm Password'}
                onChange={this.onChange}
                error={
                  confirmPassword && password && password !== confirmPassword
                }
              />
              {errors.msg && <div className='text-danger'>{errors.msg}</div>}
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  register: (payload, history) => dispatch(registerUser(payload, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
