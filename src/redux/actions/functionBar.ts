import { ToggleLibraryAction, FunctionBarAction } from '../types/functionBar';

export function toggleLibrary(): ToggleLibraryAction {
  return {
    type: FunctionBarAction.TOGGLE_LIBRARY,
  };
}
