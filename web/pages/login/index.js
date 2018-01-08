import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import PageHeaderContainer from '../../containers/page-header';
import './small.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e, loginUrl) {
    e.preventDefault();
    if (this.props.user.isLoggedIn && this.props.user.provider === loginUrl)
      window.location.href = '/auth/logout';
    else if (!this.props.user.isLoggedIn)
      window.open(`/auth/${loginUrl}`,'popup','width=600,height=600');
    return false;
  }

  render() {
    const style = {
      width: '90%',
      maxWidth: '400px',
      margin: '30px auto',
      padding: '20px',
      textAlign: 'center'
    };
    const isLoggedIn = this.props.user.isLoggedIn;
    const provider = this.props.user.provider;
    return (
      <div className="loginpage">
        <PageHeaderContainer />
        <Paper style={style} zDepth={2}>
          {isLoggedIn &&
            <div className="loggedIn">
              <span>Welcome, </span>
              <span>{this.props.user.displayName}</span>
            </div>}
          <div className="login">
            {!isLoggedIn && <span>社交账号登录</span>}
            <ul className="social">
              <li>
                <a
                  className={`weibo ${isLoggedIn && provider != 'weibo' && 'disabled'}`}
                  href="/auth/weibo"
                >
                  <img src="/assets/images/weibo.svg"/>
                  <span>{provider === 'weibo' ? '登出' : ''}Weibo</span>
                </a>
              </li>
            </ul>
          </div>
          <Link to='/create' className="link">{isLoggedIn ? 'Create CV now' : '匿名登录'}</Link>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(Login);

Login.propTypes = {
  user: PropTypes.object.isRequired
};

Login.defaultProps = {};
