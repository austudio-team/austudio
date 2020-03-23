import { put, takeEvery, select } from 'redux-saga/effects'
import { toggleLibrary } from '@redux/actions/functionBar'
import { LibraryAction } from '@redux/types/library';
import { FunctionState } from '@redux/types/functionBar';
import { librarySelector } from '@redux/selectors/functionBar';
import { RootState } from '@redux/reducers';

function* autoToggleLibrary() {
  const state: RootState = yield select();
  if (FunctionState.ACTIVE !== librarySelector(state.functionBar)) {
    yield put(toggleLibrary());
  }
}

export default function* watchLibraryDrag() {
  yield takeEvery([LibraryAction.ADD_AUDIO], autoToggleLibrary);
}
