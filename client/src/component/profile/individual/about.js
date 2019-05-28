import React, { Component } from 'react';

class About extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-light mb-3'>
            <h3 className='text-center text-info'>John's Bio</h3>
            <p className='lead'>{profile.bio ? profile.bio : ''}</p>
            <hr />
            <h3 className='text-center text-info'>Skill Set</h3>
            <div className='row'>
              <div className='d-flex flex-wrap justify-content-center align-items-center'>
                {profile.skills &&
                  profile.skills.length > 0 &&
                  profile.skills.map(skill => (
                    <div key={skill} className='p-3'>
                      <i className='fa fa-check' /> {skill}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
