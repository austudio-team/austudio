import React, { useRef, useEffect } from 'react';
import { ContextMenuWrapper, ContextMenuItemWrapper, ContextMenuDivider, ContextMenuWrapperPos } from './styled';

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
  const { pos: { x, y }, onClose, items } = props;

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

  const { clientHeight, clientWidth } = document.body;
  const height = 24 * items.length;
  const width = 200;

  let pos: ContextMenuWrapperPos = 'topLeft';
  if (height + y > clientHeight && width + x < clientWidth) {
    pos = 'topRight';
  } else if (height + y > clientHeight && width + x < clientWidth) {
    pos = 'topLeft';
  } else if (height + y < clientHeight && width + x > clientWidth) {
    pos = 'bottomLeft';
  } else {
    pos = 'bottomRight';
  }

  return <ContextMenuWrapper
    ref={wrapperRef}
    style={{ left: props.pos.x, top: props.pos.y }}
    pos={pos}
  >
    {
      items.map((v, i) => (
        v === 'divider' ?
          <ContextMenuDivider key={i} /> :
          (<ContextMenuItemWrapper key={i} onClick={() => {
            onClose();
            v.handler();
          }}>{v.name}</ContextMenuItemWrapper>)
      ))
    }
  </ContextMenuWrapper>;
}

export default ContextMenu;
