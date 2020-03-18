import { FunctionBarAction, FunctionBarState, FunctionState, FunctionBarActionType, FunctionBarCursorType } from "../types/functionBar"

const initialState: FunctionBarState = {
  library: FunctionState.NORMAL,
  cursorType: FunctionBarCursorType.select,
  recording: false,
  playing: false,
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
    case FunctionBarAction.REQUEST_PLAY:
      return {
        ...state,
        playing: true,
      }
    case FunctionBarAction.REQUEST_PAUSE:
      return {
        ...state,
        playing: false,
      }
    case FunctionBarAction.REQUEST_RECORD:
      return {
        ...state,
        recording: true,
      }
    case FunctionBarAction.STOP_RECORD:
      return {
        ...state,
        recording: false,
      }
    default:
      return state;
  }
}
