import React from 'react';
import Logo from '../logo';
import './small.less';

class Header extends React.Component{

  render() {
    return (
      <header className="header">
        <div className="maxwidth">
          <Logo />
        </div>
      </header>
    );
  }
}

export default Header;