import clone from 'clone';
import initialState from './initial-state';

const skill = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {
    
  case 'ADD_SKILL_GROUP': {
    const list = [...state.list];
    list.push(clone(initialState.list[0]));
    return { ...state, list};
  }

  case 'DELETE_SKILL_GROUP': {
    const list = [...state.list];
    list.splice(payload.idx, 1);
    return { ...state, list};
  }

  case 'MOVE_SKILL_GROUP': {
    const list = clone(state.list);
    const item = list.splice(payload.idx, 1);
    list.splice(payload.dir === 'up' ? payload.idx - 1: payload.idx + 1, 0, item[0]);
    return { ...state, list};
  }

  case 'TOGGLE_SKILL_GROUP': {
    return { ...state, expanded: payload.idx === state.expanded ? -1 : payload.idx};
  }

  case 'HANDLE_SKILL_INPUT_CHANGE': {
    const list = clone(state.list);
    list[payload.idx].input = {
      value: payload.value,
      error: payload.error
    };
    return { ...state, list};
  }

  case 'HANDLE_SKILL_CATEGORY_CHANGE': {
    const list = clone(state.list);
    list[payload.idx].skillCategory = {
      value: payload.value,
      error: payload.error
    };
    return { ...state, list};
  }

  case 'ADD_SKILL': {
    const list = clone(state.list);
    list[payload.idx].skills.push(list[payload.idx].input.value);
    list[payload.idx].input = clone(initialState.list[0].input);
    return { ...state, list};
  }

  case 'DELETE_SKILL': {
    const list = clone(state.list);
    list[payload.i].skills.splice(payload.j, 1);
    return { ...state, list};
  }

  default: {
    return { ...state };
  }

  }
};

export default skill;
