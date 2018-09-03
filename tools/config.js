/**
 * Config file
 */

const _facebook = {
  appID: process.env.FACEBOOK_ID,
  appSecret: process.env.FACEBOOK_SECRET,
  permissions: ['id', 'displayName', 'name', 'gender', 'picture.type(large)'],
  callbackURL: 'http://www.cvmaker.co.in/auth/facebook/return'
};

const _linkedin = {
  appID: process.env.LINKEDIN_ID,
  appSecret: process.env.LINKEDIN_SECRET,
  permissions: ['id', 'first-name', 'last-name', 'email-address', 'picture-url', 'public-profile-url'],
  callbackURL: 'http://www.cvmaker.co.in/auth/linkedin/return'
};

const _google = {
  appID: process.env.GOOGLE_ID,
  appSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://www.cvmaker.co.in/auth/google/return'
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
  url: process.env.MONGOLAB_BROWN_URI,
  user_session: 'user_sessions'
};

const _config = {
  database: _database,
  session: _session,
  facebook: _facebook,
  linkedin: _linkedin,
  google: _google,
  port: 8080
};

export default _config;
