import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import Header from '../../components/header';
import './small.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    if (window.__SERVER_DATA__) {
      this.user = window.__SERVER_DATA__.user;
    }
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
        <Header/>
        <Paper style={style} zDepth={2}>
          {this.user ? <div className="loggedIn">
            <span>Welcome, </span>
            <span>{this.user.displayName}</span>
          </div> :  
          <div className="login">
            <span>Signin with your social accounts</span>
            <ul>
              <li>
                <a className="facebook" href="/auth/facebook" target="popup" onClick={this.handleLogin}>
                  <img src="/assets/images/facebook.png" alt="facebook" />
                </a>
              </li>
            </ul>
          </div>}
          <Link to='/create' className="link">{this.user ? 'Create CV now' : 'Or, go back'}</Link>
        </Paper>
      </div>
    );
  }
}

export default Login;
