export * from './skill';

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
  payload: { type, value: e.target.value }
});

export { changePersonal, changeProfile };

// export const AUTOCOMPLETE = 'AUTOCOMPLETE';
// export function autocomplete(place, selection) {
//   return dispatch => new Promise((resolve, reject) => {
//     if (!place) {
//       reject({type: 'empty_suggestion'});
//     } else if (selection.input === 'freetext' && selection.queryType !== 'storeid') {
//       dispatch(fetchSuggestions(place)).then((result) => {
//         resolve(result.results[0].name);
//       }).catch((e) => {
//         reject(e);
//       });
//     } else {
//       resolve(place);
//     }
//   });
// }
