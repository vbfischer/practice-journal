import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const api = {};

export default (initialState = undefined) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(api),
        promiseMiddleware(),
        createLogger({
          level: 'log',
          collapsed: (getState, action, logEntry) => !logEntry.error,
          diff: true
        })
      )
    )
  );

  return {
    store
  };
};
