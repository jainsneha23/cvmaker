import express from 'express';
import AuthRouter from './auth';
import ApiRouter from './api';
import AppRouter from './app';

const Routes = (app, config) => {

  const router = express.Router();

  router.use('/auth', AuthRouter(app, config));
  router.use('/api', ApiRouter());

  router.use('/assets', express.static('assets', {maxAge: '182d'}));
  router.use('/public', express.static('public', {maxAge: '182d'}));

  router.use(AppRouter(app));

  return router;
};

export default Routes;
