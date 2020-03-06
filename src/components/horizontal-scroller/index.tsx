import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollerWrapper, ScrollerBar } from './styled';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorWidthChangeEvent, EditorScrollXChangeEvent } from '@events/editor';
import { editorChannelWidth } from '@components/editor/constants';

export interface HorizontalScrollerProps {
  maxWidth: number;
}

const HorizontalScroller: React.FC<HorizontalScrollerProps> = props => {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const clientWidthRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const scrollBarWidthRef = useRef<number>(0);
  const draggingScrollLeftRef = useRef<number>(0);
  const clickXRef = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);

  const { maxWidth } = props;

  useEffect(() => {
    const handler = ({ clientWidth }: EditorWidthChangeEvent) => {
      if (scrollBarRef.current) {
        scrollBarRef.current.style.width = `${(clientWidth - editorChannelWidth) / maxWidth * 100}%`;
        clientWidthRef.current = clientWidth - editorChannelWidth;
      }
    };
    handler({ clientWidth: clientWidthRef.current });
    eventEmitter.on(EditorEvent.editorWidthChange, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorWidthChange, handler);
    }
  }, [maxWidth]);

  useEffect(() => {
    const handler = ({ scrollLeft }: EditorScrollXChangeEvent) => {
      if (scrollBarRef.current) {
        scrollBarRef.current.style.left = `${scrollLeft / maxWidth * 100}%`;
        scrollLeftRef.current = scrollLeft;
      }
    };
    handler({ scrollLeft: scrollLeftRef.current });
    eventEmitter.on(EditorEvent.editorScrollXChanged, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorScrollXChanged, handler);
    }
  }, [maxWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    clickXRef.current = e.clientX;
    scrollBarWidthRef.current = (e.target as HTMLDivElement).clientWidth;
    draggingScrollLeftRef.current = scrollLeftRef.current;
  }, [setDragging])

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        const movement = e.clientX - clickXRef.current;
        const scale = clientWidthRef.current / scrollBarWidthRef.current;
        const targetScrollLeft = draggingScrollLeftRef.current + (movement * scale);
        eventEmitter.emit(EditorEvent.editorScrollXShouldChange, {
          scrollLeft: targetScrollLeft,
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

export default HorizontalScroller;
