import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import marko from 'marko';

import {generateComponentAsPDF} from './generate-pdf.js';
import * as Designs from '../web/designs';


/* eslint-disable no-console */

const port = 3000;
const app = express();
const ENV = process.env.NODE_ENV || 'development';

app.locals.defaultTemplate = marko.load(`${__dirname}/./pages/index.marko`);
app.locals.buildAssetsInfo = require(`${__dirname}/../build-manifest.json`);

const getComponentAsHTML = (Component, props) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(<Component data={props} />);
  } catch (exception) {
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

app.post('/download',bodyParser.json() , function(req, res){
  const fileName = `Design${req.body.designId}-${new Date().getTime()}`;
  generateComponentAsPDF({html: getComponentAsHTML(Designs[`Design${req.body.designId}`], req.body.cvdata), fileName}).then((response) => {
    res.send(response);
  }).catch((error) => res.status(500).send(error));
});

app.post('/design/:id',bodyParser.json() , function(req, res){
  try{
    let Comp = Designs[`Design${req.params.id}`];
    const html = getComponentAsHTML(Comp, req.body.cvdata);
    res.send(html);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use(express.static('assets'));
app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache');
  app.locals.defaultTemplate.render({
    mainCssBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['main.css']}`,
    mainJsBundle: ENV === 'development' ? '/main.js' : `/public/${app.locals.buildAssetsInfo['main.js']}`,
    vendorJsBundle: ENV === 'development' ? '' : `/public/${app.locals.buildAssetsInfo['vendor.js']}`,
  }, res);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
