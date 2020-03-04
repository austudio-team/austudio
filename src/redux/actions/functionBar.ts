import { ToggleLibraryAction, FunctionBarAction, FunctionBarCursorType, ToggleCursorTypeAction } from '../types/functionBar';

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
