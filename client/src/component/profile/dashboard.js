import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './loading';
import {
  resetProfile,
  getProfile,
  getAllProfile,
  deleteExperience,
  deleteEducation
} from '../../redux/actions';
import ProfileAction from './profileAction';
import Experience from './experience';
import Education from './education';

class Dashboard extends Component {
  componentDidMount() {
    const { auth } = this.props;
    this.props.getProfile(auth.user._id);
  }

  onDeleteExp = id => {
    this.props.deleteExp(id);
  };

  onDeleteEdu = id => {
    this.props.deleteEdu(id);
  };

  render() {
    const { profile, auth } = this.props;
    let createProfile = null;
    if (!profile.me) {
      createProfile = (
        <div>
          <p>you have not yet setup a profile, please add some info</p>
          <Link
            to='/create-profile'
            onClick={() => {
              this.props.resetProfile();
            }}
            className='btn btn-info mb-4'
          >
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <div className='col-12'>
          <h1 className='display-4'>Dashboard page</h1>
          <Link
            className='lead mb-2 d-block'
            style={{ textDecoration: 'none' }}
            to=''
          >
            Welcome {auth.user.name}
          </Link>
          {createProfile}
        </div>
        <div className='col-12'>
          <ProfileAction />
          {profile.loading && <Loader />}
          <Experience
            experience={profile.me && profile.me.experience}
            onDeleteExp={this.onDeleteExp}
          />
          <Education
            education={profile.me && profile.me.education}
            onDeleteEdu={this.onDeleteEdu}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  resetProfile: () => dispatch(resetProfile()),
  getProfile: id => dispatch(getProfile(id)),
  getAllProfile: () => dispatch(getAllProfile()),
  deleteExp: id => dispatch(deleteExperience(id)),
  deleteEdu: id => dispatch(deleteEducation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
