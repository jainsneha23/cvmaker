const initialState = {mobileView: false};

const app = (state = initialState, action) => {

  const payload = action.payload;

  switch (action.type) {

  case 'CHANGE_VIEW':
    return { ...state, ...payload};

  default:
    return { ...state };
  }
};

export default app;
