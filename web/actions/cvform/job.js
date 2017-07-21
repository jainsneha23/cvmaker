
const toggleJobGroup = (idx) => ({
  type: 'TOGGLE_JOB_GROUP',
  payload: {idx}
});

const addJobGroup = () => ({
  type: 'ADD_JOB_GROUP'
});

const deleteJobGroup = (idx) => ({
  type: 'DELETE_JOB_GROUP',
  payload: {idx}
});

const moveJobGroup = (idx, dir) => ({
  type: 'MOVE_JOB_GROUP',
  payload: {idx, dir}
});

const handleJobChange = (idx, type, val) => ({
  type: 'HANDLE_JOB_CHANGE',
  payload: { idx, type, val }
});

export {toggleJobGroup, addJobGroup, deleteJobGroup, moveJobGroup, handleJobChange};