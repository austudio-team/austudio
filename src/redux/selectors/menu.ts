import { MenuState } from "@redux/types/menu";

export function menuStatusSelector(state: MenuState) {
  return state.openedMenu;
}

export function isMenuOpenedSelector(state: MenuState) {
  return !!state.openedMenu;
}

export function isThisMenuOpenedSelector(state: MenuState, menuKey: string) {
  return state.openedMenu === menuKey;
}

export function aboutPanelOpenedSelector(state: MenuState) {
  return state.aboutOpen;
}
