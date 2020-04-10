export enum MenuAction {
  'OPEN_MENU' = 'OPEN_MENU',
  'CLOSE_MENU' = 'CLOSE_MENU',
  'TOGGLE_ABOUT_PANEL' = 'TOGGLE_ABOUT_PANEL',
  'OPEN_EXPORT' = 'OPEN_EXPORT',
  'CLOSE_EXPORT' = 'CLOSE_EXPORT',
}

export interface MenuState {
  openedMenu: string | null;
  aboutOpen: boolean;
  exportOpen: boolean;
}

export interface OpenMenuAction {
  type: typeof MenuAction.OPEN_MENU,
  payload: string,
}

export interface ToggleAboutAction {
  type: typeof MenuAction.TOGGLE_ABOUT_PANEL,
}

export interface CloseMenuAction {
  type: typeof MenuAction.CLOSE_MENU,
}

export interface OpenExportAction {
  type: typeof MenuAction.OPEN_EXPORT,
}

export interface CloseExportAction {
  type: typeof MenuAction.CLOSE_EXPORT,
}

export type MenuActionType = OpenMenuAction | CloseMenuAction | ToggleAboutAction | OpenExportAction | CloseExportAction;
