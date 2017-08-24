const initialState = {mobileView: false, wideView: false};

const design = (state = initialState, action) => {

  const payload = action.payload;

  switch (action.type) {

  case 'CHANGE_VIEW':
    return { ...state, ...payload};

  default:
    return { ...state };
  }
};

export default design;
