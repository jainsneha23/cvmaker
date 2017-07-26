const initialState = {};

if (window.__SERVER_DATA__) {
  initialState.user = window.__SERVER_DATA__.user;
}

const user = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {

  default:
    return { ...state };
  }
};

export default user;
