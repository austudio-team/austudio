import { put, takeEvery, select } from 'redux-saga/effects'
import { toggleLibrary } from '@redux/actions/functionBar'
import { LibraryAction, DeleteAudioAction } from '@redux/types/library';
import { FunctionState } from '@redux/types/functionBar';
import { librarySelector } from '@redux/selectors/functionBar';
import { RootState } from '@redux/reducers';
import { deleteSlice } from '@redux/actions/channel';
import eventEmitter from '@utils/event';
import { LibraryEvent } from '@events/library';
import { deleteAudio } from '@redux/actions/library';

function* autoToggleLibrary() {
  const state: RootState = yield select();
  if (FunctionState.ACTIVE !== librarySelector(state.functionBar)) {
    yield put(toggleLibrary());
  }
}

function* deleteAudioSaga(action: DeleteAudioAction) {
  const state: RootState = yield select();
  const { id } = action.payload;
  const channels = state.channel.channel;
  for (const channel of Object.values(channels)) {
    for (const slice of channel.slices) {
      if (slice.audioId === id) {
        yield put(deleteSlice(channel.id, slice.id));
      }
    }
  }
  yield put(deleteAudio(id));
  eventEmitter.emit(LibraryEvent.DELETE_AUDIO, id);
}

export default function* watchLibraryDrag() {
  yield takeEvery([LibraryAction.ADD_AUDIO], autoToggleLibrary);
  yield takeEvery([LibraryAction.REQUEST_DELETE_AUDIO], deleteAudioSaga);
}
