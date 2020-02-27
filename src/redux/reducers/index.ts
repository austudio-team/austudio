import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { functionBarReducer } from './functionBar';
import { channelReducer } from './channel';
import { libraryReducer } from './library';

export const rootReducer = combineReducers({
  menu: menuReducer,
  funtionBar: functionBarReducer,
  channel: channelReducer,
  library: libraryReducer,
});

export type RootState = ReturnType<typeof rootReducer>
