import { put, takeEvery } from 'redux-saga/effects'
import { toggleLibrary } from '@redux/actions/functionBar'
import { LibraryAction } from '@redux/types/library';

function* autoToggleLibrary() {
  yield put(toggleLibrary());
}

export default function* watchLibraryDrag() {
  yield takeEvery([LibraryAction.DRAG_START, LibraryAction.DRAG_END], autoToggleLibrary);
}
