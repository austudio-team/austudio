import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { functionBarReducer } from './functionBar';
import { channelReducer } from './channel';

export const rootReducer = combineReducers({
  menu: menuReducer,
  funtionBar: functionBarReducer,
  channel: channelReducer,
});

export type RootState = ReturnType<typeof rootReducer>
