import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextInput from '../../textInput';
import { TextArea } from '../../common';

import { addExperience } from '../../../redux/actions';

class AddExperience extends Component {
  state = {
    errors: {},
    experience: {
      current: false
    }
  };

  static getDerivedStateFromProps(nextProps) {
    const { profile } = nextProps;

    if (profile.errors) {
      return { errors: profile.errors };
    }

    return null;
  }

  onChange = e => {
    const { experience } = this.state;

    if (e.target.name === 'current') {
      this.setState({
        experience: {
          ...experience,
          current: e.target.checked
        }
      });
    } else {
      this.setState({
        experience: {
          ...experience,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { experience } = this.state;

    if (experience.current) {
      delete experience.to;
    }

    this.props.addExperience(experience, this.props.history);
  };

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state.experience;
    const { errors } = this.state;

    return (
      <div className='experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-8 mx-auto mt-4'>
              <Link to='/dashboard' className='btn btn-info'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Experience</h1>
              <p className='lead'>
                Let's get some information to make your experience stand out.
              </p>
              <p>* = required</p>
              <form onSubmit={this.onSubmit}>
                <TextInput
                  type={'text'}
                  value={company}
                  name={'company'}
                  placeholder={'* Company'}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextInput
                  type={'text'}
                  value={title}
                  name={'title'}
                  placeholder={'* Job Title'}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextInput
                  type={'text'}
                  value={location}
                  name={'location'}
                  placeholder={'Location'}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextInput
                  type={'date'}
                  value={from}
                  name={'from'}
                  placeholder={'Location'}
                  onChange={this.onChange}
                  title={'From Date'}
                  error={errors.from}
                />
                <TextInput
                  type={'date'}
                  value={to}
                  name={'to'}
                  title={'To Date'}
                  placeholder={'Location'}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={current ? true : false}
                />
                <div className='form-group form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    id='current'
                    value={current}
                    onChange={this.onChange}
                  />
                  <label className='form-check-label' htmlFor='current'>
                    Current
                  </label>
                </div>
                <TextArea
                  value={description}
                  name={'description'}
                  placeholder={'Job Description'}
                  onChange={this.onChange}
                  info={'Tell us about the position'}
                  error={errors.description}
                />
                <input type='submit' className='btn btn-info btn-block' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  addExperience: (payload, history) => dispatch(addExperience(payload, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperience);
