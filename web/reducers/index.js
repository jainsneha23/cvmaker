import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvform from './cvform/';
import build from './build';
import template from './template';
import user from './user';
import app from './app';

const reducer = combineReducers({
  cvform,
  user,
  build,
  template,
  app,
  routing: routerReducer
});

export default reducer;
