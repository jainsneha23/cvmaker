
const toggleEduGroup = (idx) => ({
  type: 'TOGGLE_EDU_GROUP',
  payload: {idx}
});

const addEduGroup = () => ({
  type: 'ADD_EDU_GROUP'
});

const deleteEduGroup = (idx) => ({
  type: 'DELETE_EDU_GROUP',
  payload: {idx}
});

const moveEduGroup = (idx, dir) => ({
  type: 'MOVE_EDU_GROUP',
  payload: {idx, dir}
});

const handleEduChange = (idx, type, val) => ({
  type: 'HANDLE_EDU_CHANGE',
  payload: { idx, type, val }
});

export {toggleEduGroup, addEduGroup, deleteEduGroup, moveEduGroup, handleEduChange};