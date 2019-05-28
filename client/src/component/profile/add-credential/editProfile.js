import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { withRouter, Link } from 'react-router-dom';

import { registerProfile, userLogout } from '../../../redux/actions';
import { TextInput } from '../../index';
import { SelectList, TextArea, InputGroup } from '../../common';

const options = [
  { label: '* Select Professional Status', value: 0 },
  { label: 'Developer', value: 'Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' }
];
class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    me: {},
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const me = nextProps.profile.me;
    if (me && Object.keys(preState.me).length === 0) {
      if (Array.isArray(me.skills)) {
        me.skills = me.skills.join(',');
      }

      if (me.social) {
        me.facebook = me.social.facebook;
        me.linkedin = me.social.linkedin;
      }
      return {
        me
      };
    }
    return null;
  }

  onChange = e => {
    const { me } = this.state;
    this.setState({
      me: {
        ...me,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const profile = this.state.me;
    profile.social = {
      facebook: profile.facebook,
      linkedin: profile.linkedin
    };

    this.props.registerProfile(
      _.pick(profile, [
        'handle',
        'company',
        'website',
        'location',
        'status',
        'skills',
        'bio',
        'github_username',
        'social'
      ]),
      this.props.history
    );
  };
  render() {
    const {
      handle,
      company,
      website,
      bio,
      location,
      status,
      skills,
      github_username,
      linkedin,
      facebook
    } = this.state.me;
    const { errors, displaySocialInputs } = this.state;

    return (
      <div className='create-profile mb-5'>
        <div className='row'>
          <div className='col-8 mx-auto mt-4'>
            <Link to='/dashboard' className='btn btn-info'>
              Go Back
            </Link>
            <h1 className='display-4 text-center'>Edit Your Profile</h1>
            <p className='text-center lead'>
              Let's get some information to make your profile stand out.
            </p>
            <p>* = required</p>
            <form onSubmit={this.onSubmit}>
              <TextInput
                type={'text'}
                value={handle}
                name={'handle'}
                placeholder={'* Profile Handle'}
                onChange={this.onChange}
                info={
                  'A unique handle for your Profile URL. Your full name, company name, nickname'
                }
                error={errors.handle}
              />
              <SelectList
                name={'status'}
                options={options}
                onChange={this.onChange}
                value={status}
                info={'Give us an idea of where you are at in your career'}
                error={errors.status}
              />
              <TextInput
                type={'text'}
                value={company}
                name={'company'}
                placeholder={'Company'}
                onChange={this.onChange}
                info={'Could be your own company or one you work for'}
                error={errors.company}
              />
              <TextInput
                type={'text'}
                value={website}
                name={'website'}
                placeholder={'Website'}
                onChange={this.onChange}
                info={'Could be your own website or company one'}
                error={errors.website}
              />
              <TextInput
                type={'text'}
                value={location}
                name={'location'}
                placeholder={'Location'}
                onChange={this.onChange}
                info={'City or city & state suggested (eg. HCM City, Viet Nam)'}
                error={errors.location}
              />
              <TextInput
                type={'text'}
                value={skills}
                name={'skills'}
                placeholder={'* Skills'}
                onChange={this.onChange}
                info={
                  'Please you comma separate values (eg. HTML,CSS,JS,NodeJS)'
                }
                error={errors.skills}
              />
              <TextInput
                type={'text'}
                value={github_username}
                name={'github_username'}
                placeholder={'Github Username'}
                onChange={this.onChange}
                info={
                  'If you want your latest repos and a github link, include your username'
                }
                error={errors.github_username}
              />
              <TextArea
                value={bio}
                name={'bio'}
                placeholder={'Short Bio'}
                onChange={this.onChange}
                info={'Tell us about little yourself'}
                error={errors.bio}
              />
              <div className='mb-3'>
                <button
                  type='button'
                  onClick={() => {
                    this.setState({
                      displaySocialInputs: !displaySocialInputs
                    });
                  }}
                  className='btn btn-light'
                >
                  Add Social Network Links
                </button>
              </div>
              {displaySocialInputs && (
                <div>
                  <InputGroup
                    type={'text'}
                    icon_name={'fab fa-facebook-square'}
                    value={facebook}
                    name={'facebook'}
                    placeholder={'Facebook Page URL'}
                    onChange={this.onChange}
                    info={'ie. http://www.facebook.com/me'}
                    error={errors['profile,facebook']}
                  />
                  <InputGroup
                    type={'text'}
                    icon_name={'fab fa-linkedin'}
                    value={linkedin}
                    name={'linkedin'}
                    placeholder={'Linkedin Profile URL'}
                    onChange={this.onChange}
                    info={'ie. http://www.linkedin.com/me'}
                    error={errors['profile,linkedin']}
                  />
                </div>
              )}
              {errors.token && (
                <p className='text-danger' style={{ fontSize: '14px' }}>
                  {errors.token}
                </p>
              )}
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
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
  registerProfile: (payload, history) =>
    dispatch(registerProfile(payload, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
