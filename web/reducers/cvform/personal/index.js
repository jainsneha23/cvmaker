import initialState from './initial-state';

const personal = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {

  case 'INIT_STATE': {
    let experience;
    if (typeof state.experience.value !== 'object') {
      let value;
      try {
        value = Number(state.experience.value);
      } catch(e) {value = 0;}
      const years = Math.floor(value);
      const months = (value - years) * 12;
      experience = {value: {years, months}, error: ''};
    } else experience = state.experience;

    return { ...initialState, ...state, experience};
  }
    
  case 'CHANGE_PERSONAL':
    return { ...state, [payload.type]: {value: payload.value, error: payload.error}};

  case 'CHANGE_PERSONAL_EXPERIENCE': {
    let error = '';
    var expValue = {...state.experience.value, ...{[payload.type]: payload.value}};
    if (expValue.years + expValue.months === 0)
      error = 'This field is required';
    return { ...state, experience: {value: expValue, error}};
  }

  default:
    return { ...state };
  }
};

export default personal;
