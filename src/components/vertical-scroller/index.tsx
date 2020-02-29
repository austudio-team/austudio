import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollerWrapper, ScrollerBar } from './styled';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorHeightChangeEvent, EditorScrollYChangeEvent } from '@events/editor';

const VerticalScroller: React.FC = props => {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const clientHeightRef = useRef<number>(0);
  const scrollTopRef = useRef<number>(0);
  const scrollHeightRef = useRef<number>(0);
  const scrollBarHeightRef = useRef<number>(0);
  const draggingScrollTopRef = useRef<number>(0);
  const clickYRef = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const handler = ({ clientHeight, scrollHeight }: EditorHeightChangeEvent) => {
      if (scrollBarRef.current) {
        scrollBarRef.current.style.height = `${clientHeight / scrollHeight * 100}%`;
        clientHeightRef.current = clientHeight;
        scrollHeightRef.current = scrollHeight;
      }
    };
    eventEmitter.on(EditorEvent.editorHeightChange, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorHeightChange, handler);
    }
  }, []);

  useEffect(() => {
    const handler = ({ scrollTop }: EditorScrollYChangeEvent) => {
      if (scrollBarRef.current) {
        scrollBarRef.current.style.top = `${scrollTop / scrollHeightRef.current * 100}%`;
        scrollTopRef.current = scrollTop;
      }
    };
    eventEmitter.on(EditorEvent.editorScrollYChanged, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorScrollYChanged, handler);
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    clickYRef.current = e.clientY;
    scrollBarHeightRef.current = (e.target as HTMLDivElement).clientHeight;
    draggingScrollTopRef.current = scrollTopRef.current;
  }, [setDragging])

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        const movement = e.clientY - clickYRef.current;
        const scale = clientHeightRef.current / scrollBarHeightRef.current;
        const targetScrollTop = draggingScrollTopRef.current + (movement * scale);
        eventEmitter.emit(EditorEvent.editorScrollYShouldChange, {
          scrollTop: targetScrollTop,
        });
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        setDragging(false);
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging]);

  return (
    <ScrollerWrapper>
      <ScrollerBar onMouseDown={handleMouseDown} ref={scrollBarRef} />
    </ScrollerWrapper>
  );
}

export default VerticalScroller;
