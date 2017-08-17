import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvformReducer from './cvform/';
import build from './build';
import user from './user';

const reducer = combineReducers({
  cvform: cvformReducer,
  user: user,
  build: build,
  routing: routerReducer
});

export default reducer;
