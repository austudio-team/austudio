import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyledAudioBlock, AudioName, CutLine } from './styled';
import { AudioSlice } from '@redux/types/channel';
import { RootState } from '@redux/reducers';
import { audioItemSelector } from '@redux/selectors/library';
import { connect, ConnectedProps } from 'react-redux';
import { getLength } from './utils';
import { isBlockSelectedSelector, zoomSelector } from '@redux/selectors/editor';
import { selectBlock } from '@redux/actions/editor';
import { updateSlice, splitSlice } from '@redux/actions/channel';
import { editorChannelWidth } from '@components/editor/constants';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorScrollXChangeEvent, EditorTrackMouseEnterEvent } from '@events';
import { cursorTypeSelector } from '@redux/selectors/functionBar';
import { FunctionBarCursorType } from '@redux/types/functionBar';

interface AudioBlockProps {
  slice: AudioSlice;
  channelId: string;
  channelIndex: number,
}

const mapState = (state: RootState, ownProps: AudioBlockProps) => ({
  audio: audioItemSelector(state.library, ownProps.slice.audioId),
  zoom: zoomSelector(state.editor),
  selected: isBlockSelectedSelector(state.editor, ownProps.slice.id),
  cursorType: cursorTypeSelector(state.functionBar),
});

const mapDispatch = {
  selectBlock,
  updateSlice,
  splitSlice,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioBlockProps;

const AudioBlock: React.FC<Props> = props => {
  const { audio, slice, selected, selectBlock, cursorType,
          zoom, updateSlice, channelId, channelIndex, splitSlice } = props;
  const length = getLength(slice, audio);
  const width = Math.ceil(length / zoom) + 2;
  const offset = Math.ceil(slice.offset / zoom);
  const audioBlockRef = useRef<HTMLDivElement>(null);
  const clickXRef = useRef<number>(0);
  const draggingX = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cutHover, setCutHover] = useState<boolean>(false);
  const editorSize = useRef<{height: number, width: number}>({ height: 0, width: 0 });
  const editorDraggingScrollLeft = useRef<number>(0);
  const editorScrollLeft = useRef<number>(0);
  const mouseMovement = useRef<number>(0);
  const mouseEnterInfoRef = useRef<EditorTrackMouseEnterEvent | null>(null);
  const cutLineRef = useRef<HTMLDivElement>(null);
  const cutLineOffsetRef = useRef<number>(0);

  const computeDraggingX = useCallback(() => {
    const editorScrollDelta = editorScrollLeft.current - editorDraggingScrollLeft.current;
    const tempDraggingX = Math.max(0, offset + mouseMovement.current + editorScrollDelta);
    return tempDraggingX;
  }, [offset])

  useEffect(() => {
    if (dragging) {
      let raf: number;
      const rafHandler = () => {
        if (audioBlockRef.current) {
          const tempDraggingX = computeDraggingX();
          if (draggingX.current !== tempDraggingX) {
            draggingX.current = tempDraggingX;
          }
          let translateY = 0;
          if (mouseEnterInfoRef.current) {
            const { channelIndex: newChannelIndex } = mouseEnterInfoRef.current;
            if (newChannelIndex !== channelIndex) {
              translateY = (newChannelIndex - channelIndex) * 126;
            }
          }
          audioBlockRef.current.style.transform = `translate(${draggingX.current}px, ${translateY}px)`;
          raf = requestAnimationFrame(rafHandler);
        }
      }
      rafHandler();
      return () => {
        cancelAnimationFrame(raf);
      }
    }
  }, [dragging, computeDraggingX, channelIndex]);

  const mouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selected) {
      selectBlock(slice.id);
    }
    if (cursorType === FunctionBarCursorType.select) {
      setDragging(true);
      clickXRef.current = e.clientX;
      draggingX.current = offset;
      editorSize.current = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
      editorDraggingScrollLeft.current = editorScrollLeft.current;
      mouseMovement.current = 0;
    } else if (cursorType === FunctionBarCursorType.cut && cutHover) {
      cutLineOffsetRef.current > 2 && cutLineOffsetRef.current < width - 2 &&
        splitSlice(channelId, slice.id, cutLineOffsetRef.current * zoom);
    }
  }, [channelId, slice.id, width, selected, selectBlock, setDragging, offset, cursorType, cutHover, splitSlice, zoom]);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        if (audioBlockRef.current) {
          mouseMovement.current = e.clientX - clickXRef.current;
          let deltaX = 0;
          // x
          const { width, height } = editorSize.current;
          if (e.clientX < editorChannelWidth + 20) {
            deltaX = e.clientX - editorChannelWidth - 20;
            eventEmitter.emit(EditorEvent.editorRequestAutoScrollX, {
              delta: deltaX,
            });
          } else if (e.clientX > width - 100) {
            deltaX = 100 - (width - e.clientX);
            eventEmitter.emit(EditorEvent.editorRequestAutoScrollX, {
              delta: deltaX,
            });
          } else {
            eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
          }
          // y
          if (e.clientY > height - 50) {
            const deltaY = (50 - (height - e.clientY)) * 0.3;
            eventEmitter.emit(EditorEvent.editorRequestAutoScrollY, {
              delta: deltaY,
            });
          } else if (e.clientY < 140) {
            const deltaY = (e.clientY - 140) * 0.3;
            eventEmitter.emit(EditorEvent.editorRequestAutoScrollY, {
              delta: deltaY,
            });
          } else {
            eventEmitter.emit(EditorEvent.editorCancelAutoScrollY);
          }
        }
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging, offset]);

  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollXChanged, ({ scrollLeft }: EditorScrollXChangeEvent) => {
      editorScrollLeft.current = scrollLeft;
    });
  }, [])

  useEffect(() => {
    if (dragging) {
      const handler = (e: EditorTrackMouseEnterEvent) => {
        mouseEnterInfoRef.current = e;
      };
      eventEmitter.on(EditorEvent.editorTrackMouseEnter, handler);
      return () => {
        eventEmitter.off(EditorEvent.editorTrackMouseEnter, handler);
      }
    }
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollY);
        setDragging(false);
        let newChannel: null | string = null;
        if (mouseEnterInfoRef.current) {
          const { channelId: newChannelId } = mouseEnterInfoRef.current;
          if (newChannelId !== channelId) {
            newChannel = newChannelId;
          }
        }
        updateSlice(channelId, slice.id, {
          offset: computeDraggingX() * zoom,
        }, newChannel);
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging, channelId, slice.id, updateSlice, zoom, computeDraggingX]);

  const mouseOverHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 防止 Block 的 MouseEnter 上升到 Track，导致拖拽时来回在原轨道和新轨道之间鬼畜
    if (dragging) {
      e.stopPropagation();
    } else if (cursorType === FunctionBarCursorType.cut) {
      if (!cutHover) setCutHover(true);
    }
  }, [dragging, cursorType, setCutHover, cutHover]);

  const mouseMoveHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cutHover && cutLineRef.current) {
      const { offsetX } = e.nativeEvent;
      cutLineRef.current.style.transform = `translateX(${offsetX}px)`;
      cutLineOffsetRef.current = offsetX;
    }
  }, [cutHover]);

  const mouseLeaveHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cutHover) setCutHover(false);
  }, [cutHover, setCutHover]);

  return (
    <StyledAudioBlock
      ref={audioBlockRef}
      selected={selected}
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{ width, transform: `translateX(${offset}px)` }}
    >
      <AudioName>{audio.fileName}</AudioName>
      {
        cursorType === FunctionBarCursorType.cut && cutHover && <CutLine ref={cutLineRef} />
      }
    </StyledAudioBlock>
  );
}

export default connector(AudioBlock);
