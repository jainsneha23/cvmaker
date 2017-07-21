import {EditorState} from 'draft-js';

export default {
  expanded: -1,
  list: [{
    label: {
      value: '',
      error: ''
    },
    description: {
      value: EditorState.createEmpty(),
      error: ''
    }
  }]
};
