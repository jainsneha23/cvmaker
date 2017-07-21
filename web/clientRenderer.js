import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-promise/auto';
import fetch from 'isomorphic-fetch';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Page from './index';
/* global document, window, alert */

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

if (document) {

  const sendErr = (err) => {
    fetch('/logs/report-client-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json, text/plain'
      },
      body: err
    });
  };

  const showError = () => {
    /* eslint-disable no-alert */
    alert('Something went wrong! Some parts of this page may not be working as expected.');
    /* eslint-enable no-alert */
  };

  const render = () => {
    try {
      /* eslint-disable no-underscore-dangle */
      const initialState = window.__REDUX_STATE__;

      ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}>
        <Page initialState={initialState} />
      </MuiThemeProvider>,
      document.getElementById('app'));

    } catch (err) {
      // sendErr(err);
      // showError();
      console.log(err);
    }
  };

  render();
}