import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-promise/auto';
import fetch from 'isomorphic-fetch';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {ResumeService, UserService} from './api';
import {htmlToJson} from './utils/parse-cvform';
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

  window.sendErr = (err) => {
    fetch('/logs/report-client-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: err
    });
  };

  const showError = () => {
    /* eslint-disable no-alert */
    alert('Something went wrong! Some parts of this page may not be working as expected.');
    /* eslint-enable no-alert */
  };

  const render = (initialState) => {
    ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}>
      <Page initialState={initialState} />
    </MuiThemeProvider>,
    document.getElementById('app'));
  };

  const main = () => {
    try {
      /* eslint-disable no-underscore-dangle */
      const initialState = window.__REDUX_STATE__;
      if (!initialState.user) {
        const user_id = UserService.get();
        if (user_id) {
          initialState.user = {id: user_id};
        } else {
          initialState.user = {id: new Date().getTime()};
          UserService.add(initialState.user);
        }
        initialState.user.isLoggedIn = false;
      }
      ResumeService.get(initialState.user).then(res => {
        if (res.errors) {
          throw `ResumeService get error: ${res.errors}`;
        }
        if (res.data.resumes.length === 0) {
          initialState.user.isNew = true;
        } else {
          initialState.cvform = htmlToJson(res.data.resumes[0].cvdata);
          initialState.design = JSON.parse(res.data.resumes[0].design);
        }
        render(initialState);
      }).catch((e) => {
        window.sendErr(e.message);
        showError();
      });
    } catch (err) {
      window.sendErr(err.stack);
      showError();
    }
  };
  main();
}
