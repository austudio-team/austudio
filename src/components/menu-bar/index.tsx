import React from 'react';
import { MenuBarContainer } from '@components/styled';
import MenuItem from '@components/menu-item';
import { menu } from '@constants';

const MenuBar: React.FC = () => {
  return (
    <MenuBarContainer>
      {menu.map(v => (<MenuItem key={v.key} menu={v} />))}
    </MenuBarContainer>
  );
};

export default MenuBar;
