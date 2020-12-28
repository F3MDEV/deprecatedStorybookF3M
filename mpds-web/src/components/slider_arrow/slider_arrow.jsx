import React from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default ({ className, to, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`button button--text button--icon ${className}`}
    aria-label={to}>
    <ArrowBackIosIcon className='icon' icon={to} />
  </button>
);
