import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from '../logo';
import './small.less';

class Header extends React.Component{

  render() {
    return (
      <AppBar
        className="fixed"
        iconElementLeft={<Logo />}
      />
    );
  }
}

export default Header;
