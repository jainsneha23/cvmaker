import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

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
    this.menuItemStyle = {color: '#fff', backgroundColor: '#40a7ba'};
    this.toggleBurger = this.toggleBurger.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
    window.addEventListener('resize', this.handleWidth);
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
    const photo = this.props.user && this.props.user.photos && this.props.user.photos.length && this.props.user.photos[0].value;
    this.location = `${window.location.pathname}${window.location.hash}`;
    return (
      <div className="pageheader fixed">
        <AppBar
          iconElementLeft={<div>
            <NavigationMenu onClick={this.toggleBurger} style={{height: 40, width: 40, cursor: 'pointer'}}  color="#fff" />
            <Drawer
              docked={this.props.wideView ? true : false}
              width={240}
              open={this.props.wideView ? true : this.state.burgerState}
              onRequestChange={this.toggleBurger}>
              <Menu width={240} autoWidth={false} >
                <MenuItem>
                  <div style={{textAlign: 'center'}}>
                    {this.props.user.id ? <div>
                      {photo? <Avatar size={80} src={photo} /> : <Avatar size={80} backgroundColor={'#40a7ba'}>{this.props.user.displayName.substr(0,1)}</Avatar>}
                      <p>{this.props.user.displayName}</p>
                    </div> :
                      <AccountCircle style={{height: 80, width: 80}} color='rgb(64, 167, 186)' />
                    }
                  </div>
                </MenuItem>
                <Divider />
                {this.props.user.id && <MenuItem onClick={this.toggleBurger}>
                  <a className="menulink" href='/auth/logout'>Logout</a>
                </MenuItem>}
                {!this.props.user.id && <MenuItem style={(this.location === '/login' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
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
                <Divider />
                <MenuItem style={(this.location === '/#contact' && this.menuItemStyle) || {}} onClick={this.toggleBurger}>
                  <Link className="menulink" to='/#contact'>Contact</Link>
                </MenuItem>
                <MenuItem>
                  <p>Like Us:</p>
                  <div className="fb-like" data-href="https://www.facebook.com/instantCvMaker/" data-width="25" data-layout="box_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
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

export default PageHeader;
