
const toggleSkillGroup = (idx) => ({
  type: 'TOGGLE_SKILL_GROUP',
  payload: {idx}
});

const addSkillGroup = () => ({
  type: 'ADD_SKILL_GROUP'
});

const deleteSkillGroup = (idx) => ({
  type: 'DELETE_SKILL_GROUP',
  payload: {idx}
});

const moveSkillGroup = (idx, dir) => ({
  type: 'MOVE_SKILL_GROUP',
  payload: {idx, dir}
});

const handleSkillInputChange = (e, idx) => ({
  type: 'HANDLE_SKILL_INPUT_CHANGE',
  payload: {
    idx,
    value: e.target.value,
    error: !e.target.value && 'Please enter a skill'
  }
});

const handleSkillCategoryChange = (e, idx) => ({
  type: 'HANDLE_SKILL_CATEGORY_CHANGE',
  payload: {
    idx,
    value: e.target.value,
    error: !e.target.value && 'Please enter a skill category'
  }
});

const addSkill = (idx) => ({
  type: 'ADD_SKILL',
  payload: {idx}
});

const deleteSkill = (i, j) => ({
  type: 'DELETE_SKILL',
  payload: {i, j}
});

export {addSkillGroup, deleteSkillGroup, moveSkillGroup, toggleSkillGroup,
  handleSkillInputChange, deleteSkill, addSkill, handleSkillCategoryChange};
