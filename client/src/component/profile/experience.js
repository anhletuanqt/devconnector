import React, { Component } from 'react';
import moment from 'moment';

class Experience extends Component {
  render() {
    const { experience } = this.props;
    let experiences = (
      <tr>
        <td>No experiences</td>
      </tr>
    );

    if (Array.isArray(experience) && experience.length > 0) {
      experiences = experience.map((exp, index) => {
        const to = exp.to ? moment(exp.to).format('DD/MM/YYYY') : 'now';
        return (
          <tr key={exp._id} className='mx-auto'>
            <th scope='row'>{index + 1}</th>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              {moment(exp.from).format('DD/MM/YYYY')} - {to}
            </td>
            <td>
              <button
                onClick={() => this.props.onDeleteExp(exp._id)}
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
        <h4>Experience credenticals</h4>
        <table className='table table-hover mb-5'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Company</th>
              <th scope='col'>Title</th>
              <th scope='col'>Date</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    );
  }
}

export default Experience;
