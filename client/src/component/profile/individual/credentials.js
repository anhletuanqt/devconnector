import React, { Component } from 'react';
import moment from 'moment';

class Credential extends Component {
  render() {
    const { experiences, educations } = this.props;

    return (
      <div className='row'>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Experience</h3>
          <ul className='list-group'>
            {experiences.map(exp => (
              <li key={exp._id} className='list-group-item'>
                <h4>{exp.company}</h4>
                <p>{`${moment(exp.from).format('YYYY/MM/DD')} - ${
                  exp.current ? 'Current' : moment(exp.to).format('YYYY/MM/DD')
                }`}</p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Education</h3>
          <ul className='list-group'>
            {educations.map(edu => (
              <li key={edu._id} className='list-group-item'>
                <h4>{edu.school}</h4>
                <p>{`${moment(edu.from).format('YYYY/MM/DD')} - ${
                  edu.current ? 'Current' : moment(edu.to).format('YYYY/MM/DD')
                }`}</p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.field_of_study}
                </p>
                <p>
                  <strong>Description:</strong> {edu.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Credential;
