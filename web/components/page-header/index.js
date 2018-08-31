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
      burgerState: false
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

  handleWidth() {
    this.props.changeView({
      mobileView: window.innerWidth <= 604
    });
  }

  toggleBurger() {
    this.setState({burgerState: !this.state.burgerState});
  }

  render() {
    const photo = this.props.user && this.props.user.photos && this.props.user.photos.length && this.props.user.photos[0].value;
    this.location = `${window.location.pathname}${window.location.hash}`;
    return (
      <div className="pageheader fixed" style={{height: '64px'}}>
        <AppBar
          showMenuIconButton={false}
          titleStyle={{flex: 'none'}}
          iconElementRight={
            <div className="navMenu">
              <NavigationMenu onClick={this.toggleBurger} style={{height: 40, width: 40, cursor: 'pointer'}} color={this.props.muiTheme.palette.canvasColor} />
              <Drawer
                docked={false}
                width={240}
                open={this.state.burgerState}
                openSecondary={true}
                onRequestChange={this.toggleBurger}>
                <Menu style={{marginBottom: '20px'}} width={240} autoWidth={false} disableAutoFocus={true} >
                  <MenuItem>
                    <div style={{textAlign: 'center'}}>
                      {this.props.user.isLoggedIn ? <div>
                        {photo? <Avatar size={80} src={photo} /> : <Avatar size={80}>{this.props.user.displayName.substr(0,1)}</Avatar>}
                        <p>{this.props.user.displayName}</p>
                      </div> :
                        <AccountCircle color={this.props.muiTheme.palette.primaryColor} style={{height: 80, width: 80}} />
                      }
                    </div>
                  </MenuItem>
                  <Divider style={{backgroundColor: '#c5c5c5'}} />
                  {this.props.user.isLoggedIn && <MenuItem onClick={this.toggleBurger}>
                    <a className="menulink" href='/auth/logout'>Logout</a>
                  </MenuItem>}
                  {!this.props.user.isLoggedIn && <MenuItem style={(this.location === '/login' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/login'>Login</Link>
                  </MenuItem>}
                  <Divider style={{backgroundColor: '#c5c5c5'}} />
                  <MenuItem style={(this.location === '/#top' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/'>Home</Link>
                  </MenuItem>
                  <MenuItem style={(this.location === '/editor' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/editor'>Editor</Link>
                  </MenuItem>
                  <MenuItem style={(this.location === '/preview' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/preview'>Preview</Link>
                  </MenuItem>
                  <MenuItem style={(this.location === '/templates' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/templates'>Templates</Link>
                  </MenuItem>
                  <Divider style={{backgroundColor: '#c5c5c5'}} />
                  <MenuItem style={(this.location === '/#contact' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                    <Link className="menulink" to='/#contact'>Contact</Link>
                  </MenuItem>
                  <MenuItem>
                    <p>Like Us:</p>
                    <ul className="social">
                      <li><div className="fb-like" data-href="https://www.facebook.com/instantCvMaker/" data-width="25" data-layout="box_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div></li>
                      <li><div className="g-follow" data-annotation="vertical-bubble" data-height="24" data-href="//plus.google.com/u/0/113575630639787427005" data-rel="author"></div></li>
                      <li><div className="g-plusone" data-annotation="standard" data-href="http://www.cvmaker.co.in"></div></li>
                    </ul>
                  </MenuItem>
                </Menu>
              </Drawer>
            </div>}
          title={<Logo />}
          zDepth={0}
        />
      </div>
    );
  }
}

PageHeader.propTypes = {
  muiTheme: PropTypes.object,
  rightElem: PropTypes.node,
  user: PropTypes.object,
  changeView: PropTypes.func.isRequired,
  mobileView: PropTypes.bool.isRequired
};

export default muiThemeable()(PageHeader);
