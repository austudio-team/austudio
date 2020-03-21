import { MenuEvent } from "@events/menu";

export interface MenuItemType {
  key: string,
  name: string,
  items: SubMenuItemType[];
}

export interface SubMenuItemType {
  name: string,
  key: string,
  action?: string,
}

export const menu = [
  {
    key: 'FILE',
    name: 'FILE',
    items: [
      {
        name: 'Import',
        key: 'FILE_OPEN',
        action: MenuEvent.MENU_IMPORT,
      },
      {
        name: 'Export',
        key: 'FILE_EXPORT',
        action: MenuEvent.MENU_EXPORT,
      },
      {
        name: 'divider',
        key: 'FILE_DIVIDER_1'
      },
      {
        name: 'Exit',
        key: 'SYSTEM_CLOSE',
        action: MenuEvent.MENU_EXIT,
      }
    ]
  },
  {
    name: 'ABOUT',
    key: 'ABOUT',
    items: [
      {
        name: 'About',
        key: 'ABOUT_ABOUT',
        action: MenuEvent.MENU_ABOUT,
      },
    ]
  }
];
