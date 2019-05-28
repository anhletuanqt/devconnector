import rootReducer from './reducers';
import rootSaga from '../sagas';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
// import rehydration from '../services/rehydration';
// import reduxPersist from '../config/reduxPersist';
// import Logger from './middleware/logger';
// import Network from './middlewares/networkMiddleware';

// creates the store
export default () => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  // const navigationMiddleware = createReactNavigationReduxMiddleware(
  //   'root',
  //   state => state.nav
  // );
  // middleware.push(navigationMiddleware);

  /* ------------- Logger Middleware ------------- */
  // middleware.push(Logger);

  /* ------------- Network Middleware ------------- */
  // middleware.push(Network);

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* Enable redux dev tools only in development.
   * We suggest using the standalone React Native Debugger extension:
   * https://github.com/jhen0409/react-native-debugger
   */
  /* eslint-disable no-undef */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable no-undef */

  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  // configure persistStore and check reducer version number
  // if (reduxPersist.active) {
  //   rehydration.updateReducers(store);
  // }
  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware
  };
};
