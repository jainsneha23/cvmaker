const _weibo = {
  appID: '2306597009',
  appSecret: '1bae84ee38447da06ea29b7bce53ef30',
  callbackURL: 'http://127.0.0.1:8080/auth/weibo/return',
};

const _session = {
  name: 'cvmaker',
  secret: 'cvmaker_secret',
  clear_interval: 3600,
  cookie: {
    maxAge: 1800000
  }
};

const _database = {
  port: 27017,
  url: 'mongodb://127.0.0.1',
  user_session: 'user_sessions'
};

const _config = {
  database: _database,
  session: _session,
  weibo: _weibo,
  port: 8080
};

export default _config;
