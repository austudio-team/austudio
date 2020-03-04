export enum FunctionBarAction {
  'TOGGLE_LIBRARY' = 'TOGGLE_LIBRARY',
  'TOGGLE_CURSOR_TYPE' = 'TOGGLE_CURSOR_TYPE',
}

export enum FunctionBarCursorType {
  'select' = 'select',
  'cut' = 'cut',
  'stretch' = 'stretch',
}

export enum FunctionState {
  'ACTIVE',
  'DISABLE',
  'NORMAL',
}

export interface FunctionBarState {
  library: FunctionState;
  cursorType: FunctionBarCursorType;
}

export interface ToggleLibraryAction {
  type: typeof FunctionBarAction.TOGGLE_LIBRARY,
}

export interface ToggleCursorTypeAction {
  type: typeof FunctionBarAction.TOGGLE_CURSOR_TYPE,
  payload: {
    target: FunctionBarCursorType,
  }
}

export type FunctionBarActionType = ToggleLibraryAction | ToggleCursorTypeAction;
