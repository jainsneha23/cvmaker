import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvform from './cvform/';
import build from './build';
import template from './template';
import user from './user';
import app from './app';
import share from './share';

const reducer = combineReducers({
  cvform,
  user,
  build,
  template,
  share,
  app,
  routing: routerReducer
});

export default reducer;
