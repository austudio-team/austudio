import { put, takeEvery, select } from 'redux-saga/effects'
import { EditorAction, AudioDropAction } from '@redux/types/editor';
import { RootState } from '@redux/reducers';
import { createSlice } from '@redux/actions/channel';
import { draggingAudioSelector } from '@redux/selectors/library';

function* audioDropToSlice(action: AudioDropAction) {
  const state: RootState = yield select();
  const draggingAudio = draggingAudioSelector(state.library);
  if (draggingAudio) {
    const { payload: { channelId, offset } } = action;
    yield put(createSlice(channelId, {
      offset,
      start: -1,
      end: -1,
      stretch: 1,
      audioId: draggingAudio,
    }));
  }
}

export default function* watchEditorSagas() {
  yield takeEvery(EditorAction.AUDIO_DROP, audioDropToSlice);
}
