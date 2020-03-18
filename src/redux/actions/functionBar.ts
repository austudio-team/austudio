import { ToggleLibraryAction, FunctionBarAction, FunctionBarCursorType, ToggleCursorTypeAction, RequestPlayAction, RequestPauseAction, RequestRecordAction, StopRecordAction } from '../types/functionBar';

export function toggleLibrary(): ToggleLibraryAction {
  return {
    type: FunctionBarAction.TOGGLE_LIBRARY,
  };
}

export function toggleCursorType(type: FunctionBarCursorType): ToggleCursorTypeAction {
  return {
    type: FunctionBarAction.TOGGLE_CURSOR_TYPE,
    payload: {
      target: type,
    }
  };
}

export function requestPlay(): RequestPlayAction {
  return {
    type: FunctionBarAction.REQUEST_PLAY,
  };
}

export function requestPause(): RequestPauseAction {
  return {
    type: FunctionBarAction.REQUEST_PAUSE,
  };
}

export function requestRecord(): RequestRecordAction {
  return {
    type: FunctionBarAction.REQUEST_RECORD,
  };
}

export function stopRecord(): StopRecordAction {
  return {
    type: FunctionBarAction.STOP_RECORD,
  };
}
