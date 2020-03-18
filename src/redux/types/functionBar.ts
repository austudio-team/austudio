export enum FunctionBarAction {
  'TOGGLE_LIBRARY' = 'TOGGLE_LIBRARY',
  'TOGGLE_CURSOR_TYPE' = 'TOGGLE_CURSOR_TYPE',
  'REQUEST_PLAY' = 'REQUEST_PLAY',
  'REQUEST_PAUSE' = 'REQUEST_PAUSE',
  'REQUEST_RECORD' = 'REQUEST_RECORD',
  'STOP_RECORD' = 'STOP_RECORD',
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
  playing: boolean;
  recording: boolean;
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

export interface RequestPlayAction {
  type: typeof FunctionBarAction.REQUEST_PLAY,
}

export interface RequestPauseAction {
  type: typeof FunctionBarAction.REQUEST_PAUSE,
}

export interface RequestRecordAction {
  type: typeof FunctionBarAction.REQUEST_RECORD,
}

export interface StopRecordAction {
  type: typeof FunctionBarAction.STOP_RECORD,
}

export type FunctionBarActionType = ToggleLibraryAction | ToggleCursorTypeAction | RequestPlayAction |
                                    RequestPauseAction | StopRecordAction | RequestRecordAction;
