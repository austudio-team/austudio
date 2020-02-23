import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { functionBarReducer } from './functionBar';

export const rootReducer = combineReducers({
  menu: menuReducer,
  funtionBar: functionBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>
