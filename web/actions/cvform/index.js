export * from './skill';
export * from './job';
export * from './education';
export * from './misc';

const changePersonal = (e, type) => ({
  type: 'CHANGE_PERSONAL',
  payload: {
    type,
    value: e.target.value,
    error: e.target.required && !e.target.value ? 'This field is required' : ''
  }
});

const changeProfile = (e, type) => ({
  type: 'CHANGE_PROFILE',
  payload: { type, value: e }
});

export { changePersonal, changeProfile };
