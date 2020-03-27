import { all, fork } from 'redux-saga/effects';
import editorSaga from './editor';
import functionBarSaga from './funtionBar';
import librarySaga from './library';
import channelSaga from './channel';
import audioEffectSaga from './audioEffects';

export default function* rootSaga() {
  yield all([
    fork(editorSaga),
    fork(functionBarSaga),
    fork(librarySaga),
    fork(channelSaga),
    fork(audioEffectSaga),
  ]);
}
