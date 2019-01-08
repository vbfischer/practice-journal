import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

const logger = createLogger({
  collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(apiMiddleware, thunkMiddleware, logger)(
  createStore
);

export default (initialState = undefined) => {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return {
    persistor: persistStore(store),
    store
  };
};
