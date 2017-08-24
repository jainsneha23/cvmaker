import initialState from './initial-state';

const personal = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {
    
  case 'CHANGE_PERSONAL':
    return { ...state, [payload.type]: {value: payload.value, error: payload.error}};

  default:
    return { ...state };
  }
};

export default personal;
