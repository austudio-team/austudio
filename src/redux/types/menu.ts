export enum MenuAction {
  'OPEN_MENU' = 'OPEN_MENU',
  'CLOSE_MENU' = 'CLOSE_MENU',
}

export interface MenuState {
  openedMenu: string | null;
}

export interface OpenMenuAction {
  type: typeof MenuAction.OPEN_MENU,
  payload: string,
}

export interface CloseMenuAction {
  type: typeof MenuAction.CLOSE_MENU,
}

export type MenuActionType = OpenMenuAction | CloseMenuAction;
