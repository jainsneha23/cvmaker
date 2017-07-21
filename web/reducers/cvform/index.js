import {combineReducers} from 'redux';

import personal from './personal/';
import profile from './profile/';
import skill from './skill/';

const reducer = combineReducers({
  personal,
  profile,
  skill
});

export default reducer;
