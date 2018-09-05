const changeView = (view) => ({
  type: 'CHANGE_VIEW',
  payload: view
});

const initState = () => ({
  type: 'INIT_STATE'
});

export {changeView, initState};
