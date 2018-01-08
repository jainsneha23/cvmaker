import express from 'express';
import passport from 'passport';
import { Strategy as WeiboStrategy } from 'passport-weibo';

const AuthRouter = (app, config) => {

  const router = express.Router();

  passport.use(new WeiboStrategy({
    clientID: config.weibo.appID,
    clientSecret: config.weibo.appSecret,
    callbackURL: config.weibo.callbackURL,
  }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

  passport.serializeUser((user, cb) => cb(null, user));

  passport.deserializeUser((user, cb) => cb(null, user));


  router.get('/weibo',
    passport.authenticate('weibo', { display: 'popup' }));

  router.get('/weibo/return',
    passport.authenticate('weibo'),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};

export default AuthRouter;
