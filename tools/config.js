/**
 * Config file
 */

const _facebook = {
  appID: process.env.FACEBOOK_ID,
  appSecret: process.env.FACEBOOK_SECRET,
  permissions: ['id', 'displayName', 'name', 'gender', 'picture.type(large)'],
  callbackURL: 'http://www.cvmaker.co.in/auth/facebook/return'
};

const _session = {
  name: process.env.COOKIE_NAME,
  secret: process.env.COOKIE_SECRET,
  clear_interval: 3600,
  cookie: {
    maxAge: 1800000
  }
};

const _database = {
  name: 'cvmaker',
  host: 'www.cvmaker.co.in',
  port: 27017,
  url: process.env.MONGOLAB_GREEN_URI,
  user_session: 'user_sessions'
};

const _config = {
  database: _database,
  session: _session,
  facebook: _facebook,
  port: 80
};

export default _config;
