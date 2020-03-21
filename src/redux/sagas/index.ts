import { all, fork } from 'redux-saga/effects';
import editorSaga from './editor';
import functionBarSaga from './funtionBar';
import librarySaga from './library';

export default function* rootSaga() {
  yield all([
    fork(editorSaga),
    fork(functionBarSaga),
    fork(librarySaga),
  ]);
}
