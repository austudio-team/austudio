import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownMenuContainer, DropdownInnerContainer } from './styled';

interface DropdownProps {
  value: string;
  width?: number;
  margin?: string;
  closeOnInnerClose?: boolean;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const { width, margin, value = '' } = props;
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
      ref={container}
      cssMargin={margin}
      cssWidth={width}
    >
      <DropdownInnerContainer
        onClick={handleContainerClick}
      >
        <span>{value}</span>
      </DropdownInnerContainer>
      {open && <DropdownMenuContainer />}
    </DropdownContainer>
  );
};

export default Dropdown;
