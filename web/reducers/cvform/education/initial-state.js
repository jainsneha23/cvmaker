import {EditorState} from 'draft-js';

export default {
  expanded: -1,
  list: [{
    school: {
      value: '',
      error: ''
    },
    degree: {
      value: '',
      error: ''
    },
    field: {
      value: '',
      error: ''
    },
    location: {
      value: '',
      error: ''
    },
    grade: {
      value: '',
      error: ''
    },
    startdate: {
      value: null,
      error: ''
    },
    enddate: {
      value: null,
      error: ''
    },
    description: {
      value: EditorState.createEmpty(),
      error: ''
    }
  }]
};

