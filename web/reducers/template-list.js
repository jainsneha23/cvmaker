const initialState = {
  id: 1,
  color: '#40a7ba'
};

const templateList = (state = initialState, action) => {

  const payload = action.payload;

  switch (action.type) {

  case 'CHANGE_RESUME_TEMPLATE':
    return { ...state, id: payload.templateid, color: payload.templatecolor};

  case 'CHANGE_RESUME_TEMPLATE_COLOR':
    return { ...state, color: payload};

  default:
    return { ...state };
  }
};

export default templateList;
