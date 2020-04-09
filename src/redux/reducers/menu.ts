import { MenuState, MenuActionType, MenuAction } from "../types/menu"

const initialState: MenuState = {
  openedMenu: null,
  aboutOpen: false,
  exportOpen: false,
}

export function menuReducer(state: MenuState = initialState, action: MenuActionType): MenuState {
  switch (action.type) {
    case MenuAction.OPEN_MENU:
      return {
        ...state,
        openedMenu: action.payload,
      };
    case MenuAction.CLOSE_MENU:
      return {
        ...state,
        openedMenu: null,
      };
    case MenuAction.TOGGLE_ABOUT_PANEL:
      return {
        ...state,
        aboutOpen: !state.aboutOpen,
      };
    case MenuAction.CLOSE_EXPORT:
      return {
        ...state,
        exportOpen: false,
      };
    case MenuAction.OPEN_EXPORT:
      return {
        ...state,
        exportOpen: true,
      };
    default:
      return state;
  }
}
