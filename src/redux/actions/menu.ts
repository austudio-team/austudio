import { OpenMenuAction, MenuAction, CloseMenuAction } from "../types/menu";

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
