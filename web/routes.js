import React from 'react';
import { Route } from 'react-router';

import Home from '../web/pages/home';
import Login from '../web/pages/login';
import CvForm from '../web/pages/cv-form';
import Preview from '../web/pages/preview';
import Design from '../web/pages/design';
import ErrorPage from '../web/pages/error-page';

export default (
  <div>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/create" component ={CvForm} />
    <Route path="/preview" component={Preview} />
    <Route path="/designs" component={Design} />
    <Route path='*' component={ErrorPage} />
  </div>
);
