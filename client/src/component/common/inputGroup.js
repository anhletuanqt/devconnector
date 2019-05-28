import React from 'react';
import classnames from 'classnames';
import PropType from 'prop-types';

function TextInput({
  type,
  value,
  name,
  placeholder,
  onChange,
  error,
  info,
  icon_name
}) {
  return (
    <div className='mb-3'>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id='basic-addon1'>
            <i className={icon_name} />
          </span>
        </div>
        <input
          type={type}
          value={value}
          name={name}
          className='form-control'
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      {error && <p className='text-secondary'>{error}</p>}
      {info && <p className='text-secondary'>{info}</p>}
    </div>
  );
}

TextInput.propTypes = {
  type: PropType.string.isRequired,
  value: PropType.string.isRequired,
  name: PropType.string.isRequired,
  placeholder: PropType.string.isRequired,
  onChange: PropType.func,
  error: PropType.object
};

TextInput.defaultProps = {
  type: 'text',
  value: ''
};

export default TextInput;
