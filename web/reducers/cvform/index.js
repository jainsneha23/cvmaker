import {combineReducers} from 'redux';

import personal from './personal/';
import profile from './profile/';
import skill from './skill/';
import misc from  './misc/';

const reducer = combineReducers({
  personal,
  profile,
  skill,
  misc
});

export default reducer;
