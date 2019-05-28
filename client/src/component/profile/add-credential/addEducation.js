import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextInput from '../../textInput';
import { TextArea } from '../../common';

import { addEducation } from '../../../redux/actions';

class AddEducation extends Component {
  state = {
    errors: {},
    education: {
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
    const { education } = this.state;

    if (e.target.name === 'current') {
      this.setState({
        education: {
          ...education,
          current: e.target.checked
        }
      });
    } else {
      this.setState({
        education: {
          ...education,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { education } = this.state;

    if (education.current) {
      delete education.to;
    }

    this.props.addEducation(education, this.props.history);
  };

  render() {
    const {
      school,
      degree,
      field_of_study,
      from,
      to,
      current,
      description
    } = this.state.education;
    const { errors } = this.state;

    return (
      <div className='experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-8 mx-auto mt-4'>
              <Link to='/dashboard' className='btn btn-info'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Education</h1>
              <p className='lead'>
                Let's get some information to make your education stand out.
              </p>
              <p>* = required</p>
              <form onSubmit={this.onSubmit}>
                <TextInput
                  type={'text'}
                  value={school}
                  name={'school'}
                  placeholder={'* School'}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextInput
                  type={'text'}
                  value={degree}
                  name={'degree'}
                  placeholder={'* Degree'}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextInput
                  type={'text'}
                  value={field_of_study}
                  name={'field_of_study'}
                  placeholder={'Field Of Study'}
                  onChange={this.onChange}
                  error={errors.field_of_study}
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
  addEducation: (payload, history) => dispatch(addEducation(payload, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEducation);
