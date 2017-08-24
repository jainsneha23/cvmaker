import React from 'react';
import {match} from 'react-router';
import {renderToString} from 'react-dom/server';
import Page from '../web';
import configureStore from '../web/store/configureStore';
import routes from '../web/routes';

class ServerRenderer {

  constructor(EnvConfig, app) {
    this.app = app;
    this.EnvConfig = EnvConfig;
  }

  route(req, res) {
    /* eslint-disable consistent-return */
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    /* eslint-enable */
      if (error) {
        console.error(`Invalid request 50x: ${error.message}`);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        console.log(`Invalid request 40x for ${req.url}`);
      } else {
        const initialState = {
          env: 'development'
        };
        const reduxStore = configureStore(initialState);
        const state = reduxStore.getState();
        const reactDOM = renderToString(<Page initialState={state} {...renderProps} />);
        return reactDOM;
      }
    });
  }
}

export default ServerRenderer;
