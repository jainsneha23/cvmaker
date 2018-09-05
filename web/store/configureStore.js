import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore(preloadedState) {
  const enhancer = applyMiddleware(promise, thunkMiddleware);
  const buildEnv = preloadedState.build.env;
  if (buildEnv === 'development' && typeof window !== 'undefined') {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */
    return createStore(reducer, preloadedState, composeEnhancers(enhancer));
  }
  return createStore(reducer, preloadedState, enhancer);
}
