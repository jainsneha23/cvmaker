import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import marko from 'marko';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import 'ignore-styles';

import Mailer from './mailer';
import Messager from './messager';
import {generateComponentAsPDF} from './generate-pdf.js';
import * as Designs from '../web/designs';

import Schema from '../api/graphql';

/* eslint-disable no-console */

const app = express();
const port = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const mailService = new Mailer();
const messager = new Messager();

app.locals.defaultTemplate = marko.load(`${__dirname}/./pages/index.marko`);
app.locals.buildAssetsInfo = require(`${__dirname}/../build-manifest.json`);

const getComponentAsHTML = (Component, cvdata, designColor) => {
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

// GraphqQL server route
app.use('/graphql', graphqlHTTP(() => ({
  Schema,
  pretty: true
})));

let i = 0;

app.get('/query', (req, res) => {
  let query = ['query { todos { id, title, completed } }',
    'mutation { add (title: "Clean garage") { id, title } }',
    'query { todos { id, title, completed } }',
    'mutation { update (id: "1", title: "Clean inbox") { id, title } }',
    'query { todos { id, title, completed } }',
    'mutation { delete (id: "2") { id, title } }',
    'query { todos { id, title, completed } }'];
  graphql(Schema, query[i]).then( function(result) {
    res.send(JSON.stringify(result,null,' '));
    i++;
  });
});

app.post('/download', bodyParser.json() , function(req, res){
  let Comp = Designs[`Design${req.body.designId}`];
  const filename = `Design${req.body.designId}-${new Date().getTime()}`;
  generateComponentAsPDF({html: getComponentAsHTML(Comp, req.body.cvdata, req.body.designColor), filename}).then((response) => {
    res.send(response);
  }).catch((error) => res.status(500).send(error));
});

app.get('/design/:id', bodyParser.json() , function(req, res){
  try{
    const json = require('../mock/snehajain.json');
    let Comp = Designs[`Design${req.params.id}`];
    const html = getComponentAsHTML(Comp, json);
    res.send(html);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/feedback', bodyParser.json() , function(req, res){
  messager.sendFeedback(req.body);
  mailService.sendFeedback(req.body);
  res.sendStatus(204);
});

app.use(express.static('assets', {maxage: {maxAge: '182d'}}));
app.use('/public', express.static('public', {maxAge: '182d'}));

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache');
  app.locals.defaultTemplate.render({
    env: ENV,
    mainCssBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['main.css']}`,
    mainJsBundle: ENV === 'development' ? '/main.js' : `/public/${app.locals.buildAssetsInfo['main.js']}`,
    vendorJsBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['vendor.js']}`,
  }, res);
});

app.use(function(err, req, res) {
  res.status(err.status || 500).send('Internal Server Error');
});

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on port: ${port}`);
});

export default server;

