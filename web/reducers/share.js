const initialState = {
  link: null
};

const share = (state = initialState, action) => {

  switch (action.type) {

  case 'CHANGE_SHARE_LINK':
    return {...state, link: action.payload};

  default:
    return { ...state };
  }
};

export default share;
