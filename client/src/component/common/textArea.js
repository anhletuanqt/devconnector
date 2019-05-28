import React from 'react';
import classnames from 'classnames';
import PropType from 'prop-types';

function TextArea({ value, name, placeholder, onChange, error, info }) {
  return (
    <div className='form-group'>
      <textarea
        name={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
      {info && <p className='text-secondary'>{info}</p>}
    </div>
  );
}

TextArea.propTypes = {
  value: PropType.string.isRequired,
  name: PropType.string.isRequired,
  placeholder: PropType.string.isRequired,
  onChange: PropType.func,
  error: PropType.object
};

TextArea.defaultProps = {
  value: ''
};

export default TextArea;
