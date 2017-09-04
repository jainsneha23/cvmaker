import {EditorState} from 'draft-js';

export default {
  expanded: -1,
  list: [{
    company: {
      value: '',
      error: ''
    },
    jobtitle: {
      value: '',
      error: ''
    },
    location: {
      value: '',
      error: ''
    },
    startdate: {
      error: null,
      value: ''
    },
    enddate: {
      error: null,
      value: ''
    },
    currentjob: {
      value: false
    },
    responsibilities: {
      value: EditorState.createEmpty(),
      error: ''
    }
  }]
};
