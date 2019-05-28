import React from 'react';

export default function selectList({
  options,
  name,
  info,
  error,
  onChange,
  value
}) {
  const renderOptions = options.map(opt => {
    return (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    );
  });
  return (
    <div className='form-group'>
      <select
        className='custom-select custom-select-lg'
        name={name}
        onChange={onChange}
        value={value}
      >
        {renderOptions}
      </select>
      {error && <div className='invalid-feedback d-block'>{error}</div>}
      {info && <p className='text-secondary'>{info}</p>}
    </div>
  );
}
