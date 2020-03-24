import React, { useCallback } from 'react';
import {ItemWrapper, CloseIcon } from './styled';
import { Effect } from '@redux/types/audioEffect';
import { effectName } from '@constants';
import { removeEffect, openEffectPanel } from '@redux/actions/audioEffect';

interface DropdownItemProps {
  item: Effect;
  channelId: string;
  removeEffect: typeof removeEffect;
  openEffectPanel: typeof openEffectPanel;
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const { item, channelId, removeEffect, openEffectPanel } = props;

  const handleRemoveEffect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeEffect(channelId, item.id);
  }, [removeEffect, channelId, item]);

  const handleOpenEffectPanel = useCallback(() => {
    openEffectPanel(channelId, item.id);
  }, [channelId, item, openEffectPanel]);

  return (
    <ItemWrapper onClick={handleOpenEffectPanel}>
      <CloseIcon onClick={handleRemoveEffect} />
      {effectName[item.type]}
    </ItemWrapper>
  );
};

export default DropdownItem;
