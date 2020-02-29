import { all, fork } from 'redux-saga/effects';
import editorSaga from './editor';
import functionBarSaga from './funtionBar';

export default function* rootSaga() {
  yield all([
    fork(editorSaga),
    fork(functionBarSaga),
  ]);
}
