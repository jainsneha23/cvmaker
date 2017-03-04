import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500, deepOrange500, grey100} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from '../web/pages/home';
import CvForm from '../web/pages/cv-form';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: deepOrange500,
    primary3Color: grey100,
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

