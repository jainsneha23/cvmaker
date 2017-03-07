import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from '../web/pages/home';
import CvForm from '../web/pages/cv-form';

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
       <Route path = "/" component = {Home} />
       <Route path = "/create" component = {CvForm} />
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'));

