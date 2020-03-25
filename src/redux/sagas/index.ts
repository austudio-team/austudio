import { all, fork } from 'redux-saga/effects';
import editorSaga from './editor';
import functionBarSaga from './funtionBar';
import librarySaga from './library';
import channelSaga from './channel';

export default function* rootSaga() {
  yield all([
    fork(editorSaga),
    fork(functionBarSaga),
    fork(librarySaga),
    fork(channelSaga),
  ]);
}
