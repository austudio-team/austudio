import eventEmitter from "@utils/event";
import store from "@redux";
import { toggleAboutPanel } from "@redux/actions/menu";

export enum MenuEvent {
  'MENU_IMPORT' = 'MENU_IMPORT',
  'MENU_EXPORT' = 'MENU_EXPORT',
  'MENU_EXIT' = 'MENU_EXIT',
  'MENU_ABOUT' = 'MENU_ABOUT',
}

eventEmitter.on(MenuEvent.MENU_ABOUT, () => {
  store.dispatch(toggleAboutPanel());
});
