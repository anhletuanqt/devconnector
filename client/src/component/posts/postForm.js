import React, { Component } from 'react';
import { TextArea } from '../common';

class PostForm extends Component {
  render() {
    const { value, onChange, onSubmit, error } = this.props;
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>Say Somthing...</div>
          <div className='card-body'>
            <form onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <TextArea
                  value={value}
                  name={'post'}
                  onChange={onChange}
                  placeholder={'Add Post'}
                  error={error}
                />
              </div>
              <button type='submit' className='btn btn-dark'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
