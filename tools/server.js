import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import marko from 'marko';
import passport from 'passport';
import Session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import Mongo from 'connect-mongo';
import 'ignore-styles';

import Routes from './routes';

import CONFIG from './config';
import Database from './database';

/* eslint-disable no-console */

const app = express();
const MongoStore = Mongo(Session);
const port = process.env.PORT || CONFIG.port;
const ENV = process.env.NODE_ENV || 'development';
// global.db = new Database(CONFIG);

app.locals.defaultTemplate = marko.load(`${__dirname}/./pages/index.marko`);
app.locals.buildAssetsInfo = require(`${__dirname}/../build-manifest.json`);

app.locals.renderIndex = (res, data) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache');
  app.locals.defaultTemplate.render({
    env: ENV,
    mainCssBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['main.css']}`,
    mainJsBundle: ENV === 'development' ? '/main.js' : `/public/${app.locals.buildAssetsInfo['main.js']}`,
    vendorJsBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['vendor.js']}`,
    __REDUX_STATE__: JSON.stringify({...data, build: {env: ENV}})
  }, res);
};

app.locals.getComponentAsHTML = (Component, cvdata, designColor) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(<Component data={cvdata} designColor={designColor} />);
  } catch (e) {
    console.error(e);
    return '<div>Some Error Occured</div>';
  }
};

if (ENV === 'development') {
  const webpack = require('webpack');
  const webpackconfig = require('./webpack.dev');
  const compiler = webpack(webpackconfig);
  app.use(require('webpack-dev-middleware')(compiler));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(cookieParser(CONFIG.session.secret));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use(Session({
  name: CONFIG.session.name,
  secret: CONFIG.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: CONFIG.session.cookie.maxAge,
    httpOnly: true
  },
  store: new MongoStore({
    db: global.db.db,
    collection: CONFIG.database.user_session,
    clear_interval: CONFIG.session.clear_interval
  }, (err) => {
    console.error(`Mongo store error: ${err}`);
  })
}));*/

app.use(passport.initialize());
app.use(passport.session());

app.use(Routes(app, express, CONFIG));

app.use((req, res) => {
  res.status(404).send('Path not found');
});

app.use((err, req, res) => {
  console.warn(`Internal server error: ${err}`);
  res.status(err.status || 500).send('Internal Server Error');
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception Error: ${err}`);
});

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on port: ${port}`);
});

export default server;

