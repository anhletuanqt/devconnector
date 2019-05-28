import React, { Component } from 'react';
import moment from 'moment';

class Education extends Component {
  render() {
    const { education } = this.props;
    let educations = (
      <tr>
        <td>No education</td>
      </tr>
    );

    if (Array.isArray(education) && education.length > 0) {
      educations = education.map((edu, index) => {
        const to = edu.to ? moment(edu.to).format('DD/MM/YYYY') : 'now';
        return (
          <tr key={edu._id} className='mx-auto'>
            <th scope='row'>{index + 1}</th>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
              {moment(edu.from).format('DD/MM/YYYY')} - {to}
            </td>
            <td>
              <button
                onClick={() => this.props.onDeleteEdu(edu._id)}
                className='btn btn-danger btn-sm'
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h4>Education credenticals</h4>
        <table className='table table-hover mb-5'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>School</th>
              <th scope='col'>Degree</th>
              <th scope='col'>Date</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    );
  }
}

export default Education;
