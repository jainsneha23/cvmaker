import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import Logo from '../basic/logo';
import './small.less';

class PageHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      burgerState: window.innerWidth >= 1120 ? true : false
    };
    this.menuItemStyle = {color: props.muiTheme.palette.alternateTextColor, backgroundColor: props.muiTheme.palette.primary1Color};
    this.toggleBurger = this.toggleBurger.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
    window.addEventListener('resize', this.handleWidth);
    /* global gapi FB*/
    window.onGapiLoaded = () => gapi.follow.go();
    window.onFbLoaded = () => FB.XFBML.parse();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWidth);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.wideView !== this.props.wideView) {
      this.setState({burgerState: nextProps.wideView ? true : false});
    }
  }

  handleWidth() {
    this.props.changeView({
      mobileView: window.innerWidth <= 604,
      wideView: window.innerWidth >= 1120
    });
  }

  toggleBurger() {
    this.setState({burgerState: !this.props.wideView && !this.state.burgerState});
  }

  render() {
    const photo = this.props.user && this.props.user._raw && this.props.user._raw.avatar_large;
    this.location = `${window.location.pathname}${window.location.hash}`;
    return (
      <div className="pageheader fixed">
        <AppBar
          iconElementLeft={<div>
            <NavigationMenu onClick={this.toggleBurger} style={{height: 40, width: 40, cursor: 'pointer'}} color={this.props.muiTheme.palette.canvasColor} />
            <Drawer
              docked={this.props.wideView ? true : false}
              width={240}
              open={this.props.wideView ? true : this.state.burgerState}
              onRequestChange={this.toggleBurger}>
              <Menu style={{marginBottom: '20px'}} width={240} autoWidth={false} disableAutoFocus={true} >
                <MenuItem>
                  <div style={{textAlign: 'center'}}>
                    {this.props.user.isLoggedIn ? <div>
                      {photo? <Avatar size={80} src={photo} /> : <Avatar size={80}>{this.props.user.displayName.substr(0,1)}</Avatar>}
                      <p>{this.props.user.displayName}</p>
                    </div> :
                      <AccountCircle color={this.props.muiTheme.palette.primary1Color} style={{height: 80, width: 80}} />
                    }
                  </div>
                </MenuItem>
                <Divider />
                {this.props.user.isLoggedIn && <MenuItem onClick={this.toggleBurger}>
                  <a className="menulink" href='/auth/logout'>Logout</a>
                </MenuItem>}
                {!this.props.user.isLoggedIn && <MenuItem style={(this.location === '/login' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/login'>Login</Link>
                </MenuItem>}
                <Divider />
                <MenuItem style={(this.location === '/' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/'>Home</Link>
                </MenuItem>
                <MenuItem style={(this.location === '/create' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/create'>Create</Link>
                </MenuItem>
                <MenuItem style={(this.location === '/preview' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/preview'>Preview</Link>
                </MenuItem>
                <MenuItem style={(this.location === '/designs' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/designs'>Designs</Link>
                </MenuItem>
              </Menu>
            </Drawer>
          </div>}
          title={<div style={{textAlign: 'center'}}><Logo /></div>}
          iconElementRight={this.props.rightElem || null}
          zDepth={0}
        />
      </div>
    );
  }
}

PageHeader.propTypes = {
  rightElem: PropTypes.node,
  user: PropTypes.object,
  wideView: PropTypes.bool.isRequired,
  changeView: PropTypes.func.isRequired
};

export default muiThemeable()(PageHeader);
