import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { Link } from 'react-router';
import Logo from '../logo';
import './small.less';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      mobileView: true
    };
    if (window.__SERVER_DATA__) {
      this.user = window.__SERVER_DATA__.user;
    }
    this.handleWidth = this.handleWidth.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
    window.addEventListener('resize', this.handleWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWidth);
  }

  handleWidth() {
    this.setState({
      mobileView: window.innerWidth <= 604
    });
  }

  render() {
    return (
      <div className="header fixed">
        <AppBar
          className="fixed"
          iconElementLeft={<Logo />}
          iconElementRight={<div>
            {this.props.rightElem || null}
            {this.user ?
              <IconMenu
                style={{marginLeft: '10px', cursor: 'pointer'}}
                iconButtonElement={<div>{this.state.mobileView ? <Avatar
                  color='rgb(64, 167, 186)'
                  backgroundColor='#fff'>
                  {this.user && this.user.displayName[0]}</Avatar> : <RaisedButton
                  icon={<AccountCircle color='rgb(64, 167, 186)' />}
                  label={this.user.displayName}
                  labelColor='rgb(64, 167, 186)' />}</div>}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}>
                <MenuItem>
                  <a href='/auth/logout'>Log Out</a>
                </MenuItem>
              </IconMenu> :
            <Link to='/login'>
              <Avatar backgroundColor='#fff'><AccountCircle color='rgb(64, 167, 186)' /></Avatar>
            </Link>}
          </div>}
          iconStyleRight={{margin: '16px 0 0 0'}}
          iconStyleLeft={{marginLeft: '10px'}}
          style={{padding: '0 10px'}}
          zDepth={0}
        />
      </div>
    );
  }
}

Header.propTypes = {
  rightElem: React.PropTypes.node
};

export default Header;
