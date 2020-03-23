import React, { useCallback } from 'react';
import {ItemWrapper, CloseIcon } from './styled';
import { Effect } from '@redux/types/audioEffect';
import { effectName } from '@constants';
import { removeEffect } from '@redux/actions/audioEffect';

interface DropdownItemProps {
  item: Effect,
  channelId: string,
  removeEffect: typeof removeEffect
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const { item, channelId, removeEffect} = props;

  const handleRemoveEffect = useCallback(() => {
    removeEffect(channelId, item.id);
  }, [removeEffect, channelId, item])

  return (
    <ItemWrapper>
      <CloseIcon onClick={handleRemoveEffect} />
      {effectName[item.type]}
    </ItemWrapper>
  );
};

export default DropdownItem;
