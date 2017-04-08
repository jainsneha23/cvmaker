import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import webpackconfig from './webpack.dev';
import {generateComponentAsPDF} from './generate-pdf.js';
import Design1 from '../web/designs/design-1';


/* eslint-disable no-console */

const port = 3000;
const app = express();

const getComponentAsHTML = (Component, props) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(<Component data={props} />);
  } catch (exception) {
    module.reject(exception);
  }
};

if (process.env.NODE_ENV == 'development') {
  const webpack = require('webpack');
  const compiler = webpack(webpackconfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackconfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.post('/download',bodyParser.json() , function(req, res){
  const fileName = `Design${req.body.designId}-${new Date().getTime()}`;
  generateComponentAsPDF({html: getComponentAsHTML(Design1, req.body.cvdata), fileName}).then((response) => {
    res.send(response);
  }).catch((error) => res.status(500).send(error));
});

app.post('/design/:id',bodyParser.json() , function(req, res){
  try{
    const html = getComponentAsHTML(Design1, req.body.cvdata);
    res.send(html);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.use(express.static('assets'));
app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
