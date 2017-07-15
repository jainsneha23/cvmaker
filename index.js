require('babel-register');
if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}
var server = require('./tools/server.js');
module.exports = server;
