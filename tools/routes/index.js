import AuthRouter from './auth';
import ApiRouter from './api';
import AppRouter from './app';

const Routes = (app, express, CONFIG) => {

  const router = express.Router();

  router.use('/auth', AuthRouter(app, express, CONFIG));
  router.use('/api', ApiRouter(app, express, CONFIG));

  router.use('/assets', express.static('assets', {maxAge: '182d'}));
  router.use('/public', express.static('public', {maxAge: '182d'}));

  router.use(AppRouter(app, express, CONFIG));

  return router;
};

export default Routes;
