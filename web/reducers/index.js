import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvformReducer from './cvform/';
import user from './user';

const reducer = combineReducers({
  cvform: cvformReducer,
  user: user,
  routing: routerReducer
});

export default reducer;
