import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownMenuContainer } from './styled';

interface DropdownProps {
  value: string;
  width?: number;
  margin?: string;
  closeOnInnerClose?: boolean;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const { width, closeOnInnerClose, margin, value = '' } = props;
  const container = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <DropdownContainer
      cssMargin={margin}
      cssWidth={width}
      onClick={handleContainerClick}
      ref={container}
    >
      <span>{value}</span>
      {open && <DropdownMenuContainer />}
    </DropdownContainer>
  );
};

export default Dropdown;
