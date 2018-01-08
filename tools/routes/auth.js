import passport from 'passport';
import { Strategy as WeiboStrategy } from 'passport-weibo';

const AuthRouter = (app, express, CONFIG) => {

  const router = express.Router();

  passport.use(new WeiboStrategy({
    clientID: CONFIG.weibo.appID,
    clientSecret: CONFIG.weibo.appSecret,
    callbackURL: CONFIG.weibo.callbackURL,
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
