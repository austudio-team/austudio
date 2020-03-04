import { FunctionBarAction, FunctionBarState, FunctionState, FunctionBarActionType, FunctionBarCursorType } from "../types/functionBar"

const initialState: FunctionBarState = {
  library: FunctionState.NORMAL,
  cursorType: FunctionBarCursorType.select,
}

export function functionBarReducer(state: FunctionBarState = initialState, action: FunctionBarActionType): FunctionBarState {
  switch (action.type) {
    case FunctionBarAction.TOGGLE_LIBRARY:
      return {
        ...state,
        library: state.library === FunctionState.NORMAL ? FunctionState.ACTIVE : FunctionState.NORMAL,
      }
    case FunctionBarAction.TOGGLE_CURSOR_TYPE:
      return {
        ...state,
        cursorType: action.payload.target,
      }
    default:
      return state;
  }
}
