import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { mainReducer, initialState } from './main-reducer';
import mySaga from './main-saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const { __REDUX_DEVTOOLS_EXTENSION__: devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancers
);

// mount it on the Store
const store = createStore(
  mainReducer,
  initialState,
  composedEnhancers
)

// then run the saga
sagaMiddleware.run(mySaga);

export default store;