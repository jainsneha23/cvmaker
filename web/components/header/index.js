import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from '../logo';
import './small.less';

const Header = (props) => {
  return (
    <AppBar
      className="fixed"
      iconElementLeft={<Logo />}
      iconElementRight={props.rightElem || null}
      iconStyleRight={{margin: '16px 0 0 0'}}
    />
  );
};

Header.propTypes = {
  rightElem: React.PropTypes.node
};

export default Header;
