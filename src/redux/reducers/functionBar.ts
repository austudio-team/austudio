import { FunctionBarAction, FunctionBarState, FunctionState, FunctionBarActionType } from "../types/functionBar"

const initialState: FunctionBarState = {
  library: FunctionState.NORMAL,
}

export function functionBarReducer(state: FunctionBarState = initialState, action: FunctionBarActionType): FunctionBarState {
  switch (action.type) {
    case FunctionBarAction.TOGGLE_LIBRARY:
      return {
        ...state,
        library: state.library === FunctionState.NORMAL ? FunctionState.ACTIVE : FunctionState.NORMAL,
      }
    default:
      return state;
  }
}
