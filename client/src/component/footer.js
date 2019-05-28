import React from 'react';
import './component.scss';

export default function footer() {
  return (
    <div
      className='bg-dark text-light d-flex align-items-center justify-content-center footer'
      style={{ height: '6vh' }}
    >
      <footer>Copyright &copy; {new Date().getFullYear()} DevConnector</footer>
    </div>
  );
}
