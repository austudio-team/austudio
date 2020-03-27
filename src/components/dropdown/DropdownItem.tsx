import React, { useCallback } from 'react';
import {ItemWrapper, CloseIcon } from './styled';
import { Effect } from '@redux/types/audioEffect';
import { effectName } from '@constants';
import { removeEffect, openEffectPanel, closeEffectPanel } from '@redux/actions/audioEffect';

interface DropdownItemProps {
  item: Effect;
  channelId: string;
  removeEffect: typeof removeEffect;
  openEffectPanel: typeof openEffectPanel;
  closeEffectPanel: typeof closeEffectPanel;
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const { item, channelId, removeEffect, openEffectPanel, closeEffectPanel } = props;

  const handleRemoveEffect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    closeEffectPanel(channelId, item.id);
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
