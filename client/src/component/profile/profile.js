import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllProfile } from '../../redux/actions';
import './profile.scss';
import ProfileItem from './profileItem';

class Profile extends Component {
  componentDidMount() {
    this.props.getAllProfile();
  }

  render() {
    const { profile } = this.props;
    let profileItem = <p className='lead'>No profiles found.</p>;

    if (profile.profiles) {
      profileItem = profile.profiles.map(p => (
        <ProfileItem key={p._id} profile={p} />
      ));
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='card-body text-center'>
              <h1 className='display-4'>Developer Profiles</h1>
              <p className='lead'>Browse and connect with developers</p>
            </div>
          </div>

          <div className='col-12'>{profileItem}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getAllProfile: () => dispatch(getAllProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
