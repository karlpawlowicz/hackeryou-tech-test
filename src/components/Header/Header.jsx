import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="TIFF Logo" />
      </Link>
    </header>
  );
};
