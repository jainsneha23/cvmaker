import React from 'react';
import { Route } from 'react-router';

import Home from './pages/home';
import Login from './pages/login';
import Editor from './pages/editor';
import Preview from './pages/preview';
import Template from './pages/template';
import ErrorPage from './pages/error-page';

export default (
  <div>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/editor" component ={Editor} />
    <Route path="/preview" component={Preview} />
    <Route path="/templates" component={Template} />
    <Route path='*' component={ErrorPage} />
  </div>
);
