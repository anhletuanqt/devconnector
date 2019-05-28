import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfile } from '../../../redux/actions';

import Header from './header';
import About from './about';
import Credential from './credentials';
import Github from './github';
class ProfileIndividual extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getProfile(match.params.user_id);
  }
  render() {
    const { profile } = this.props;

    return (
      <div className='py-4'>
        <Link className='btn btn-info mb-4' to='/profile'>
          Back to profile
        </Link>
        <Header profile={profile.me || {}} />
        <About profile={profile.me || {}} />
        <Credential
          experiences={(profile.me && profile.me.experience) || []}
          educations={(profile.me && profile.me.education) || []}
        />
        {profile.me && profile.me.github_username && (
          <Github username={profile.me.github_username || ''} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(getProfile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileIndividual);
