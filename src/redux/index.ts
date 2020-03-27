import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from "./reducers";
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
    compose(
      applyMiddleware(
        sagaMiddleware,
      ),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    ) :
    applyMiddleware(
      sagaMiddleware,
    ),
);

sagaMiddleware.run(rootSaga);

(window as any).appStore = store;

export default store;
