import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LinkedInStrategy } from 'passport-linkedin';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const AuthRouter = (app, express, CONFIG) => {

  const router = express.Router();
  
  passport.use(new FacebookStrategy({
    clientID: CONFIG.facebook.appID,
    clientSecret: CONFIG.facebook.appSecret,
    callbackURL: CONFIG.facebook.callbackURL,
    profileFields: CONFIG.facebook.permissions
  }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

  passport.use(new LinkedInStrategy({
    consumerKey: CONFIG.linkedin.appID,
    consumerSecret: CONFIG.linkedin.appSecret,
    callbackURL: CONFIG.linkedin.callbackURL,
    profileFields: CONFIG.linkedin.permissions
  }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

  passport.use(new GoogleStrategy({
    clientID: CONFIG.google.appID,
    clientSecret: CONFIG.google.appSecret,
    callbackURL: CONFIG.google.callbackURL,
  }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

  passport.serializeUser((user, cb) => cb(null, user));

  passport.deserializeUser((user, cb) => cb(null, user));

  router.get('/facebook',
    passport.authenticate('facebook', { display: 'popup' }));

  router.get('/linkedin',
    passport.authenticate('linkedin', { display: 'popup' }));

  router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

  router.get('/facebook/return',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/linkedin/return', 
    passport.authenticate('linkedin'),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/google/return', 
    passport.authenticate('google'),
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
