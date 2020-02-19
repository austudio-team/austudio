export interface MenuItemType {
  key: string,
  name: string,
  items: SubMenuItemType[];
}

export interface SubMenuItemType {
  name: string,
  key: string,
}

export const menu = [
  {
    key: 'FILE',
    name: 'FILE',
    items: [
      {
        name: 'Open',
        key: 'FILE_OPEN'
      },
      {
        name: 'divider',
        key: 'FILE_DIVIDER_1'
      },
      {
        name: 'Close',
        key: 'FILE_CLOSE'
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
      },
    ]
  }
];
