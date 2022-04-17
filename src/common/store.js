import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const middlewares = [thunk];

let devToolsExtension = (f) => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middlewares), devToolsExtension),
);

/* istanbul ignore if  */
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
    store.replaceReducer(nextRootReducer);
  });
}

export const persistor = persistStore(store);

export default store;
