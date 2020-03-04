import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { functionBarReducer } from './functionBar';
import { channelReducer } from './channel';
import { libraryReducer } from './library';
import { editorReducer } from './editor';

export const rootReducer = combineReducers({
  menu: menuReducer,
  functionBar: functionBarReducer,
  channel: channelReducer,
  library: libraryReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>
