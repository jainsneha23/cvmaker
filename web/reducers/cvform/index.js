import {combineReducers} from 'redux';

import personal from './personal/';
import profile from './profile/';
import skill from './skill/';
import job from './job/';
import education from './education/';
import misc from  './misc/';

const reducer = combineReducers({
  personal,
  profile,
  skill,
  job,
  education,
  misc
});

export default reducer;
