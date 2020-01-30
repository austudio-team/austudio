import { MenuState, MenuActionType, MenuAction } from "../types/menu"

const initialState: MenuState = {
  openedMenu: null,
}

export function menuReducer(state: MenuState = initialState, action: MenuActionType): MenuState {
  switch (action.type) {
    case MenuAction.OPEN_MENU:
      return {
        openedMenu: action.payload,
      };
    case MenuAction.CLOSE_MENU:
      return {
        openedMenu: null,
      };
    default:
      return state;
  }
}
