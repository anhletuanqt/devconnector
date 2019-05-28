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
  title,
  disabled
}) {
  return (
    <div className='form-group'>
      {title && <p className='text-secondary mb-0'>{title}</p>}
      <input
        type={type}
        name={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
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
  error: PropType.string
};

TextInput.defaultProps = {
  type: 'text',
  value: '',
  disabled: false
};

export default TextInput;
