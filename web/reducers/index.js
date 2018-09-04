import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvform from './cvform/';
import build from './build';
import templateList from './template-list';
import user from './user';
import app from './app';

const reducer = combineReducers({
  cvform,
  user,
  build,
  templateList,
  app,
  routing: routerReducer
});

export default reducer;
