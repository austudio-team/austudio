import React, { ReactNode, useCallback, useState, useRef, useEffect, CSSProperties } from 'react';
import TooltipPop from './TooltipPop';

interface TooltipProps {
  children: ReactNode;
  title: string;
  style?: CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = props => {
  const [show, setShow] = useState<boolean>(false);
  const timeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const style: CSSProperties = {};
  if (show && containerRef.current) {
    const { height, width, x, y } = containerRef.current.getBoundingClientRect();
    style.left = `${x + width / 2}px`;
    style.top = `${y + height}px`;
  }
  return (
    <div
      ref={containerRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={mouseLeave}
      style={{ ...props.style, position: 'relative' }}
    >
      {props.children}
      <TooltipPop style={style} show={show} title={props.title} />
    </div>
  );
}

export default Tooltip;
