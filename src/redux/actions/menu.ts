import { OpenMenuAction, MenuAction, CloseMenuAction, ToggleAboutAction } from "../types/menu";

export function openMenu(menu: string): OpenMenuAction {
  return {
    type: MenuAction.OPEN_MENU,
    payload: menu,
  };
}

export function closeMenu(): CloseMenuAction {
  return {
    type: MenuAction.CLOSE_MENU,
  };
}

export function toggleAboutPanel(): ToggleAboutAction {
  return {
    type: MenuAction.TOGGLE_ABOUT_PANEL,
  };
}
