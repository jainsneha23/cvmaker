import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from '../web/pages/home';
import Login from '../web/pages/login';
import CvForm from '../web/pages/cv-form';
import Preview from '../web/pages/preview';
import Design from '../web/pages/design';
import ErrorPage from '../web/pages/error-page';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#40a7ba',
    primary2Color: '#d36d4d',
    primary3Color: '#F5F5F5',
  },
}, {
  avatar: {
    borderColor: null,
  }
});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history = {browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/create" component ={CvForm} />
      <Route path="/preview" component={Preview} />
      <Route path="/designs" component={Design} />
      <Route path='*' component={ErrorPage} />
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'));

