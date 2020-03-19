import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { functionBarReducer } from './functionBar';
import { channelReducer } from './channel';
import { libraryReducer } from './library';
import { editorReducer } from './editor';
import { AudioEffectReducer } from './audioEffect';

export const rootReducer = combineReducers({
  menu: menuReducer,
  functionBar: functionBarReducer,
  channel: channelReducer,
  library: libraryReducer,
  editor: editorReducer,
  audioEffect: AudioEffectReducer
});

export type RootState = ReturnType<typeof rootReducer>
