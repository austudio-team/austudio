export enum FunctionBarAction {
  'TOGGLE_LIBRARY' = 'TOGGLE_LIBRARY',
}

export enum FunctionState {
  'ACTIVE',
  'DISABLE',
  'NORMAL',
}

export interface FunctionBarState {
  library: FunctionState;
}

export interface ToggleLibraryAction {
  type: typeof FunctionBarAction.TOGGLE_LIBRARY,
}

export type FunctionBarActionType = ToggleLibraryAction;
