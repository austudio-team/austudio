import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownMenuContainer, DropdownInnerContainer, DropdownItemWrapper, AddEffectWrapper, AddEffectIcon } from './styled';
import { createContextMenu } from '@utils/context-menu';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  value: string;
  width?: number;
  margin?: string;
  closeOnInnerClose?: boolean;
  isShowItems?: boolean;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const { width, margin, value = '' } = props;
  const container = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectItems, setSelectItems] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      const detect = (e: MouseEvent) => {
        if (!container.current) return;
        !container.current.contains((e.target as any)) && setOpen(false);
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
          setSelectItems([...selectItems, 'Filter']);
        },
      },
      {
        name: "Compressor",
        handler: () => {
          setSelectItems([...selectItems, 'Compressor']);
        },
      },
      {
        name: "Delay",
        handler: () => {
          setSelectItems([...selectItems, 'Delay']);
        },
      },
      {
        name: "Equlizer",
        handler: () => {
          setSelectItems([...selectItems, 'Equlizer']);
        },
      },
      {
        name: "Reverb",
        handler: () => {
          setSelectItems([...selectItems, 'Reverb']);
        },
      },
      {
        name: "Tremolo",
        handler: () => {
          setSelectItems([...selectItems, 'Tremolo']);
        },
      }
    ]);
  }, [selectItems, setSelectItems]);

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
      { open && 
      <DropdownMenuContainer>
        <DropdownItemWrapper>
        {
          selectItems.map(v => (
            <DropdownItem itemName={v}></DropdownItem>
          ))
        }
        </DropdownItemWrapper>
        <AddEffectWrapper onClick={handleEffectMenu}>
          <AddEffectIcon></AddEffectIcon>
        </AddEffectWrapper>
      </DropdownMenuContainer>}
    </DropdownContainer>
  );
};

export default Dropdown;
