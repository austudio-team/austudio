import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyledAudioBlock, AudioName } from './styled';
import { AudioSlice } from '@redux/types/channel';
import { RootState } from '@redux/reducers';
import { audioItemSelector } from '@redux/selectors/library';
import { connect, ConnectedProps } from 'react-redux';
import { getLength } from './utils';
import { isBlockSelectedSelector, zoomSelector } from '@redux/selectors/editor';
import { selectBlock } from '@redux/actions/editor';
import { updateSlice } from '@redux/actions/channel';
import { editorChannelWidth } from '@components/editor/constants';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorScrollXChangeEvent } from '@events';

interface AudioBlockProps {
  slice: AudioSlice;
  channelId: string;
}

const mapState = (state: RootState, ownProps: AudioBlockProps) => ({
  audio: audioItemSelector(state.library, ownProps.slice.audioId),
  zoom: zoomSelector(state.editor),
  selected: isBlockSelectedSelector(state.editor, ownProps.slice.id),
});

const mapDispatch = {
  selectBlock,
  updateSlice,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioBlockProps;

const AudioBlock: React.FC<Props> = props => {
  const { audio, slice, selected, selectBlock, zoom, updateSlice, channelId } = props;
  const length = getLength(slice, audio);
  const width = Math.ceil(length / zoom) + 2;
  const offset = Math.ceil(slice.offset / zoom);
  const audioBlockRef = useRef<HTMLDivElement>(null);
  const clickXRef = useRef<number>(0);
  const draggingX = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const editorSize = useRef<{height: number, width: number}>({ height: 0, width: 0 });
  const editorDraggingScrollLeft = useRef<number>(0);
  const editorScrollLeft = useRef<number>(0);
  const mouseMovement = useRef<number>(0);

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
            audioBlockRef.current.style.transform = `translateX(${draggingX.current}px)`;
          }
          raf = requestAnimationFrame(rafHandler);
        }
      }
      rafHandler();
      return () => {
        cancelAnimationFrame(raf);
      }
    }
  }, [dragging, computeDraggingX]);

  const mouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selected) {
      selectBlock(slice.id);
    }
    setDragging(true);
    clickXRef.current = e.clientX;
    draggingX.current = offset;
    editorSize.current = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
    editorDraggingScrollLeft.current = editorScrollLeft.current;
    mouseMovement.current = 0;
  }, [slice.id, selected, selectBlock, setDragging, offset]);

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
          } else if (e.clientY < 120) {
            const deltaY = (e.clientY - 120) * 0.3;
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
      const handler = (e: MouseEvent) => {
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollY);
        setDragging(false);
        updateSlice(channelId, slice.id, {
          offset: computeDraggingX() * zoom,
        });
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging, channelId, slice.id, updateSlice, zoom, computeDraggingX]);

  return (
    <StyledAudioBlock
      ref={audioBlockRef}
      selected={selected}
      onMouseDown={mouseDownHandler}
      style={{ width, transform: `translateX(${offset}px)` }}
    >
      <AudioName>{audio.fileName}</AudioName>
    </StyledAudioBlock>
  );
}

export default connector(AudioBlock);
