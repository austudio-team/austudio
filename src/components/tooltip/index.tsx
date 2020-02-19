import React, { ReactNode, useCallback, useState, useRef, useEffect, CSSProperties } from 'react';
import { TooltipPop } from '@components/styled/tooltip';

interface TooltipProps {
  children: ReactNode;
  title: string;
  style?: CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = props => {
  const [show, setShow] = useState<boolean>(false);
  const timeout = useRef<number | null>(null);
  const mouseEnter = useCallback(() => {
    timeout.current = setTimeout(() => {
      setShow(true);
      timeout.current = null;
    }, 500);
  }, [setShow]);

  const mouseLeave = useCallback(() => {
    setShow(false);
    timeout.current && clearTimeout(timeout.current);
  }, [setShow]);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    }
  }, []);
  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={mouseLeave}
      style={{ ...props.style, position: 'relative' }}
    >
      {props.children}
      <TooltipPop show={show}>{props.title}</TooltipPop>
    </div>
  );
}

export default Tooltip;
