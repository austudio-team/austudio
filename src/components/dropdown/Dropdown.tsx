import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownMenuContainer, DropdownInnerContainer, DropdownItemWrapper, AddEffectWrapper, AddEffectIcon } from './styled';
import { createContextMenu } from '@utils/context-menu';
import DropdownItem from './DropdownItem';
import { RootState } from '@redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { channelEffectSelector } from '@redux/selectors/audioEffect';
import { addEffect, removeEffect, openEffectPanel } from '@redux/actions/audioEffect';
import { Effects } from '@constants';

interface DropdownProps {
  value: string;
  width?: number;
  margin?: string;
  closeOnInnerClose?: boolean;
  channelId: string;
}

const mapState = (state: RootState, ownProps: DropdownProps) => ({
  effects: channelEffectSelector(state.audioEffect, ownProps.channelId),
});
const mapDispatch = {
  addEffect,
  removeEffect,
  openEffectPanel,
}
const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector> & DropdownProps;

const Dropdown: React.FC<Props> = props => {
  const { width, margin, value = '', channelId, effects, addEffect, removeEffect, openEffectPanel } = props;
  const container = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const contextMenuOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (open) {
      const detect = (e: MouseEvent) => {
        if (!container.current) return;
        if (
          !container.current.contains((e.target as any))
          && !contextMenuOpenRef.current
        ) {
          setOpen(false);
        }
      };
      window.addEventListener('mousedown', detect);
      return () => {
        window.removeEventListener('mousedown', detect);
      };
    }
    return () => {};
  }, [open, setOpen])

  const handleContainerClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleEffectMenu = useCallback((e: React.MouseEvent) => {
    createContextMenu(e, [
      {
        name: "Filter",
        handler: () => {
          addEffect(channelId, Effects.FILTER);
        },
      },
      {
        name: "Compressor",
        handler: () => {
          addEffect(channelId, Effects.COMPRESSOR);
        },
      },
      {
        name: "Delay",
        handler: () => {
          addEffect(channelId, Effects.DELAY);
        },
      },
      {
        name: "Equlizer",
        handler: () => {
          addEffect(channelId, Effects.EQUALIZER);
        },
      },
      {
        name: "Reverb",
        handler: () => {
          addEffect(channelId, Effects.REVERB);
        },
      },
      {
        name: "Tremolo",
        handler: () => {
          addEffect(channelId, Effects.TREMOLO);
        },
      }
    ], () => {
      contextMenuOpenRef.current = false;
    });
    contextMenuOpenRef.current = true;
  }, [addEffect, channelId]);

  return (
    <DropdownContainer
      ref={container}
      cssMargin={margin}
      cssWidth={width}
    >
      <DropdownInnerContainer
        onClick={handleContainerClick}
      >
        <span>{value}</span>
      </DropdownInnerContainer>
      {open && (
        <DropdownMenuContainer>
          <DropdownItemWrapper>
          {
            effects && effects.map(v => (
              <DropdownItem
                item={v}
                key={v.id}
                channelId={channelId}
                removeEffect={removeEffect}
                openEffectPanel={openEffectPanel}
              />
            ))
          }
          </DropdownItemWrapper>
          <AddEffectWrapper onClick={handleEffectMenu}>
            <AddEffectIcon />
          </AddEffectWrapper>
        </DropdownMenuContainer>
      )}
    </DropdownContainer>
  );
};

export default connector(Dropdown);
