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
    primary1Color: '#1976D2',
    primary2Color: '#DCDCDC',
    primary3Color: '#DCDCDC',
    accent1Color: '#1976D2',
    accent2Color: '#DCDCDC',
    accent3Color: '#DCDCDC',
    textColor: '#666',
    alternateTextColor: '#FFF',
    canvasColor: '#FFF',
    borderColor: '#EFEFEF',
    disabledColor: '#CCC',
    pickerHeaderColor: '#555',
    clockCircleColor: '#FFF',
    shadowColor: '#000'
  }
}, {
  raisedButton: {
    textColor: '#1976D2'
  },
  menuItem: {
    textColor: '#1976D2',
    alternateTextColor: '#1976D2'
  },
  avatar: {
    backgroundColor: '#FFF',
    borderColor: null
  },
  toolbar: {
    backgroundColor: '#E7E7E7'
  },
  tabs: {
    backgroundColor: '#E7E7E7'
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

  const render = (preloadedState) => {
    ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}>
      <Page preloadedState={preloadedState} />
    </MuiThemeProvider>,
    document.getElementById('app'));
  };

  const main = () => {
    try {
      /* eslint-disable no-underscore-dangle */
      const preloadedState = window.__REDUX_STATE__;
      if (!preloadedState.user) {
        const user_id = UserService.get();
        if (user_id) {
          preloadedState.user = {id: user_id};
        } else {
          preloadedState.user = {id: new Date().getTime()};
          UserService.add(preloadedState.user);
        }
        preloadedState.user.isLoggedIn = false;
      }
      ResumeService.get(preloadedState.user).then(res => {
        if (res.errors) {
          throw `ResumeService get error: ${res.errors}`;
        }
        if (res.data.resumes.length === 0) {
          preloadedState.user.isNew = true;
        } else {
          preloadedState.cvform = htmlToJson(res.data.resumes[0].cvdata);
          preloadedState.templateList = JSON.parse(res.data.resumes[0].template);
        }
        render(preloadedState);
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
