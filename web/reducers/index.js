import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cvformReducer from './cvform/';

const reducer = combineReducers({
  cvform: cvformReducer,
  routing: routerReducer
});

export default reducer;
