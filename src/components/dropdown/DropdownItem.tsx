import React from 'react';
import {ItemWrapper, CloseIcon } from './styled';

interface DropdownItemProps {
  itemName: string
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const { itemName } = props;
  return (
    <ItemWrapper>
      <CloseIcon/>
      {itemName}
    </ItemWrapper>
  );
};

export default DropdownItem;
