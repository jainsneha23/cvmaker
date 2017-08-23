const initialState = {id: 1, color: '#40a7ba'};

const design = (state = initialState, action) => {

  const payload = action.payload;

  switch (action.type) {

  case 'CHANGE_RESUME_DESIGN':
    return { ...state, id: payload.designid, color: payload.designcolor};

  case 'CHANGE_RESUME_DESIGN_COLOR':
    return { ...state, color: payload};

  default:
    return { ...state };
  }
};

export default design;
