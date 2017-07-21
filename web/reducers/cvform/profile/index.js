import initialState from './initial-state';

const profile = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {
    
  case 'CHANGE_PROFILE':
    return { ...state, [payload.type]: {value: payload.value}};

  default:
    return { ...state };
  }
};

export default profile;
