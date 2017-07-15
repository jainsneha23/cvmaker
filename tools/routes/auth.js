import passport from 'passport';
import { Strategy } from 'passport-facebook';

const AuthRouter = (app, express, CONFIG) => {

  const router = express.Router();
  
  passport.use(new Strategy({
    clientID: CONFIG.facebook.appID,
    clientSecret: CONFIG.facebook.appSecret,
    callbackURL: CONFIG.facebook.callbackURL
  }, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  router.get('/facebook',
    passport.authenticate('facebook', { display: 'popup' }));

  router.get('/facebook/return',
    passport.authenticate('facebook'),
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
