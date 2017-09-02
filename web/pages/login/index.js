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
  }

  handleLogin() {
    window.open('/auth/facebook','popup','width=600,height=600');
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
    return (
      <div className="loginpage">
        <PageHeaderContainer />
        <Paper style={style} zDepth={2}>
          {this.props.user.isLoggedIn ? <div className="loggedIn">
            <span>Welcome, </span>
            <span>{this.props.user.displayName}</span>
          </div> :  
            <div className="login">
              <span>Signin with your social accounts</span>
              <ul className="social">
                <li>
                  <a className="facebook" href="/auth/facebook" target="popup" onClick={this.handleLogin}>
                    <img src="/assets/images/facebook.svg"/>
                    <span>Log in with Facebook </span>
                  </a>
                </li>
              </ul>
            </div>}
          <Link to='/create' className="link">{this.props.user.isLoggedIn ? 'Create CV now' : 'Or, continue without login'}</Link>
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
