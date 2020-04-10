import eventEmitter from "@utils/event";
import store from "@redux";
import { toggleAboutPanel, openExportDialog } from "@redux/actions/menu";

export enum MenuEvent {
  'MENU_IMPORT' = 'MENU_IMPORT',
  'MENU_EXPORT' = 'MENU_EXPORT',
  'MENU_EXPORT_DIALOG_OPEN' = 'MENU_EXPORT_DIALOG_OPEN',
  'MENU_ABOUT' = 'MENU_ABOUT',
}

eventEmitter.on(MenuEvent.MENU_ABOUT, () => {
  store.dispatch(toggleAboutPanel());
});

eventEmitter.on(MenuEvent.MENU_EXPORT_DIALOG_OPEN, () => {
  store.dispatch(openExportDialog());
});
