import React from 'react';
import { Link } from 'react-router';

import './small.less';

const Logo = () => (
  <Link className="logo" to='#'>
    {/* <span className="beta">Beta</span> */}
  </Link>
);

export default Logo;