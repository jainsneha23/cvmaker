import * as storeActions from '../stores/';
import * as locationsActions from '../locations/';
import * as suggestionActions from '../suggestions/';

export function handleFailure(e) {
  return (dispatch) => {
    if (e && e.type) {
      if (e.type.match(/store/ig)) dispatch(storeActions.storesFailure(e));
      if (e.type.match(/suggestion/ig)) dispatch(suggestionActions.suggestionsFailure(e));
      if (e.type.match(/location/ig)) dispatch(locationsActions.locationFailure(e));
    } else dispatch(storeActions.storesFailure(e));
  };
}

/* Todo check if loggable, then log the error to the server
function isLoggable(e) {
  const loggables = ['invalid_suggestion', 'invalid_storeid'];
  return loggables.indexOf(e.type) !== -1;
} */

export function logFailure() {
}
