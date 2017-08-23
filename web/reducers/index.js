import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvform from './cvform/';
import build from './build';
import design from './design';
import user from './user';
import app from './app';

const reducer = combineReducers({
  cvform,
  user,
  build,
  design,
  app,
  routing: routerReducer
});

export default reducer;
