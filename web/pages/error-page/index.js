import React from 'react';
import Header from '../../components/header';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './small.less';

const ErrorPage = () => (
  <div className="errorpage">
    <Header/>
    <section>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <Link to='/'>
        <RaisedButton primary label={'Go back to home page'} ></RaisedButton>
      </Link>
    </section>
  </div>
);

export default ErrorPage;
