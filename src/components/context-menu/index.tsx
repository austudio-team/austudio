import React, { useRef, useEffect } from 'react';
import { ContextMenuWrapper, ContextMenuItemWrapper, ContextMenuDivider } from './styled';

interface ContextMenuClickable {
  name: string;
  handler: (...arg: any) => void;
}

export type ContextMenuItem = ContextMenuClickable | 'divider';

interface ContextMenuProps {
  items: ContextMenuItem[];
  onClose: () => void;
  pos: {
    x: number;
    y: number;
  };
}

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detect = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      !wrapperRef.current.contains((e.target as any)) && props.onClose();
    };
    window.addEventListener('mousedown', detect, true);
    return () => {
      window.removeEventListener('mousedown', detect, true);
    };
  }, [props]);

  return <ContextMenuWrapper ref={wrapperRef} style={{ left: props.pos.x, top: props.pos.y }}>
    {
      props.items.map((v, i) => (
        v === 'divider' ?
          <ContextMenuDivider key={i} /> :
          (<ContextMenuItemWrapper key={i} onClick={() => {
            props.onClose();
            v.handler();
          }}>{v.name}</ContextMenuItemWrapper>)
      ))
    }
  </ContextMenuWrapper>;
}

export default ContextMenu;
