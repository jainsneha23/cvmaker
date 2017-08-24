
const toggleMiscGroup = (idx) => ({
  type: 'TOGGLE_MISC_GROUP',
  payload: {idx}
});

const addMiscGroup = () => ({
  type: 'ADD_MISC_GROUP'
});

const deleteMiscGroup = (idx) => ({
  type: 'DELETE_MISC_GROUP',
  payload: {idx}
});

const moveMiscGroup = (idx, dir) => ({
  type: 'MOVE_MISC_GROUP',
  payload: {idx, dir}
});

const handleMiscChange = (idx, type, val) => ({
  type: 'HANDLE_MISC_CHANGE',
  payload: { idx, type, val }
});

export {toggleMiscGroup, addMiscGroup, deleteMiscGroup, moveMiscGroup, handleMiscChange};