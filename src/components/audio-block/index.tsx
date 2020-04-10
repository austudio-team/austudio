import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyledAudioBlock, AudioName, CutLine, LeftStretcher, RightStretcher, VisualEffectImage, RollingIcon } from './styled';
import { AudioSlice } from '@redux/types/channel';
import { RootState } from '@redux/reducers';
import { audioItemSelector } from '@redux/selectors/library';
import { connect, ConnectedProps } from 'react-redux';
import { getLength, computeDraggingX, computeWidth, computeStretch } from './utils';
import { isBlockSelectedSelector, zoomSelector } from '@redux/selectors/editor';
import { selectBlock } from '@redux/actions/editor';
import { updateSlice, splitSlice, deleteSlice } from '@redux/actions/channel';
import { editorChannelWidth } from '@components/editor/constants';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorScrollXChangeEvent, EditorTrackMouseEnterEvent } from '@events';
import { cursorTypeSelector } from '@redux/selectors/functionBar';
import { FunctionBarCursorType } from '@redux/types/functionBar';
import { StretchingType } from './types';
import { KeyEventEmitter } from '@utils/keyevent';
import { KeyEvent } from '@utils/keyevent_declare';
import { createContextMenu } from '@utils/context-menu';
import { getCanvas } from '@audio/VisualEffect';
import { debounce } from 'lodash';

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
  deleteSlice,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioBlockProps;

const AudioBlock: React.FC<Props> = props => {
  const { audio, slice, selected, selectBlock, cursorType, deleteSlice,
          zoom, updateSlice, channelId, channelIndex, splitSlice } = props;
  const length = getLength(slice, audio);
  const width = Math.ceil(length / zoom) + 2;
  const offset = Math.ceil(slice.offset / zoom);
  const audioBlockRef = useRef<HTMLDivElement>(null);
  const clickXRef = useRef<number>(0);
  const draggingX = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cutHover, setCutHover] = useState<boolean>(false);
  const [stretching, setStretching] = useState<boolean>(false);
  const editorSize = useRef<{height: number, width: number}>({ height: 0, width: 0 });
  const editorDraggingScrollLeft = useRef<number>(0);
  const editorScrollLeft = useRef<number>(0);
  const mouseMovement = useRef<number>(0);
  const mouseEnterInfoRef = useRef<EditorTrackMouseEnterEvent | null>(null);
  const cutLineRef = useRef<HTMLDivElement>(null);
  const cutLineOffsetRef = useRef<number>(0);
  const stretchingType = useRef<StretchingType>(StretchingType.left);
  const stretchingStart = useRef<number>(0);
  const stretchingEnd = useRef<number>(0);
  const stretchingOffset = useRef<number>(0);
  const stretchingStretch = useRef<number>(0);
  const visualEffectImageRef = useRef<HTMLImageElement>(null);
  const [visualEffectImageLoaded, setVisualEffectImageLoaded] = useState<boolean>(false);

  const currentScale = useRef<number>(slice.stretch / zoom);
  const visualEffectImageOffset = useRef<number>(-Math.ceil(slice.start * slice.stretch / zoom));

  // graphEffect
  useEffect(() => {
    const ref = visualEffectImageRef.current;
    if (ref) {
      ref.src = getCanvas(audio.id, currentScale.current);
    }
    setVisualEffectImageLoaded(true);
  }, [audio.id]);

  const fetchGraph = useCallback(debounce((scale: number) => {
    visualEffectImageOffset.current = visualEffectImageOffset.current * (scale / currentScale.current);
    currentScale.current = scale;
    const ref = visualEffectImageRef.current;
    if (ref) {
      ref.style.transform = `translateX(${visualEffectImageOffset.current}px)`;
      ref.src = getCanvas(audio.id, scale);
    }
    setVisualEffectImageLoaded(true);
  }, 200, { trailing: true, leading: false }), [setVisualEffectImageLoaded]);

  const updateGraph = useCallback(() => {
    setVisualEffectImageLoaded(false);
    const targetScale = stretchingStretch.current !== 0 ? (stretchingStretch.current / zoom) : slice.stretch / zoom;
    fetchGraph(targetScale);
    const base = targetScale / currentScale.current;
    const ref = visualEffectImageRef.current;
    if (ref) {
      ref.style.transform = `translateX(${visualEffectImageOffset.current * base}px) scaleX(${base})`;
    }
  }, [fetchGraph, zoom, slice.stretch]);

  // zoomEffect
  useEffect(() => {
    updateGraph();
  }, [zoom, updateGraph])
  
  // DragRaf
  // draggingEffect
  useEffect(() => {
    if (dragging) {
      let raf: number;
      const rafHandler = () => {
        if (audioBlockRef.current) {
          const tempDraggingX = computeDraggingX(editorScrollLeft.current, editorDraggingScrollLeft.current, offset, mouseMovement.current);
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
  }, [dragging, offset, channelIndex]);

  // stretchRaf
  // stretchingEffect
  useEffect(() => {
    if (stretching) {
      let raf: number;
      const rafHandler = () => {
        if (audioBlockRef.current && visualEffectImageRef.current) {
          if (cursorType === FunctionBarCursorType.stretch) {
            const { width: newWidth, offset: newOffset, stretch } = computeStretch(editorScrollLeft.current,
              editorDraggingScrollLeft.current,
              mouseMovement.current,
              stretchingType.current,
              slice,
              audio,
              zoom);
            
            stretchingOffset.current = newOffset;
            stretchingStretch.current = stretch;

            if (stretchingType.current === StretchingType.right) {
              audioBlockRef.current.style.width = `${newWidth + 2}px`;
            } else {
              audioBlockRef.current.style.width = `${newWidth + 2}px`;
              audioBlockRef.current.style.transform = `translateX(${Math.ceil(newOffset / zoom)}px)`;
            }
          } else {
            const { width: newWidth, offset: newOffset, start, end } = computeWidth(editorScrollLeft.current,
                                          editorDraggingScrollLeft.current,
                                          mouseMovement.current,
                                          stretchingType.current,
                                          slice,
                                          audio,
                                          zoom);
            stretchingStart.current = start;
            stretchingEnd.current = end;
            stretchingOffset.current = newOffset;
            
            if (stretchingType.current === StretchingType.right) {
              audioBlockRef.current.style.width = `${newWidth + 2}px`;
            } else {
              audioBlockRef.current.style.width = `${newWidth + 2}px`;
              visualEffectImageOffset.current = -Math.ceil(start * slice.stretch / zoom);
              visualEffectImageRef.current.style.transform = `translateX(${visualEffectImageOffset.current}px)`;
              audioBlockRef.current.style.transform = `translateX(${Math.ceil(newOffset / zoom)}px)`;
            }
          }
        }
        raf = requestAnimationFrame(rafHandler);
      }
      rafHandler();
      return () => {
        cancelAnimationFrame(raf);
      }
    }
  }, [cursorType, stretching, audio, slice, zoom, offset]);

  const initDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clickXRef.current = e.clientX;
    draggingX.current = offset;
    editorSize.current = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
    editorDraggingScrollLeft.current = editorScrollLeft.current;
    mouseMovement.current = 0;
  }, [offset])

  const mouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selected) {
      selectBlock(slice.id);
    }
    if (cursorType === FunctionBarCursorType.select || cursorType === FunctionBarCursorType.stretch) {
      setDragging(true);
      initDrag(e);
    } else if (cursorType === FunctionBarCursorType.cut && cutHover) {
      cutLineOffsetRef.current > 2 && cutLineOffsetRef.current < width - 2 &&
        splitSlice(channelId, slice.id, cutLineOffsetRef.current * zoom / slice.stretch);
    }
  }, [channelId, slice.id, slice.stretch, width, selected, selectBlock, setDragging, cursorType, cutHover, splitSlice, zoom, initDrag]);

  // mouseMoveEffect
  useEffect(() => {
    if (dragging || stretching) {
      const handler = (e: MouseEvent) => {
        if (audioBlockRef.current && e.which === 1) {
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
          if (cursorType === FunctionBarCursorType.stretch && stretching) {
            updateGraph();
          }
        }
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging, stretching, offset, cursorType, updateGraph]);

  // editorScrollXChangeEventEffect
  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollXChanged, ({ scrollLeft }: EditorScrollXChangeEvent) => {
      editorScrollLeft.current = scrollLeft;
    });
  }, [])

  // trackEnterEventEffect
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

  // mouseUpEffect
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
        const targetOffset = computeDraggingX(editorScrollLeft.current, editorDraggingScrollLeft.current, offset, mouseMovement.current) * zoom;
        if (targetOffset !== slice.offset || newChannel) {
          updateSlice(channelId, slice.id, {
            offset: targetOffset,
          }, newChannel);
        }
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    } else if (stretching) {
      const handler = (e: MouseEvent) => {
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollY);
        setStretching(false);
        if (cursorType === FunctionBarCursorType.stretch) {
          updateSlice(channelId, slice.id, {
            offset: stretchingOffset.current,
            stretch: stretchingStretch.current,
          }, null);
        } else {
          updateSlice(channelId, slice.id, {
            offset: stretchingOffset.current,
            start: stretchingStart.current,
            end: stretchingEnd.current,
          }, null);
        }
        stretchingStretch.current = 0;
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, stretching, setStretching, setDragging, channelId, slice.id, slice.offset, updateSlice, zoom, offset, cursorType]);

  const cutMouseOverHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 防止 Block 的 MouseEnter 上升到 Track，导致拖拽时来回在原轨道和新轨道之间鬼畜
    if (dragging) {
      e.stopPropagation();
    } else if (cursorType === FunctionBarCursorType.cut) {
      if (!cutHover) setCutHover(true);
    }
  }, [dragging, cursorType, setCutHover, cutHover]);

  const cutMouseMoveHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cutHover && cutLineRef.current) {
      const { offsetX } = e.nativeEvent;
      cutLineRef.current.style.transform = `translateX(${offsetX}px)`;
      cutLineOffsetRef.current = offsetX;
    }
  }, [cutHover]);

  const cutMouseLeaveHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cutHover) setCutHover(false);
  }, [cutHover, setCutHover]);

  const stretcherMouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    initDrag(e);
    stretchingType.current = e.currentTarget.dataset.type as StretchingType;
    setStretching(true);
  }, [setStretching, initDrag]);

  useEffect(() => {
    const handler = () => {
      if (selected) {
        deleteSlice(channelId, slice.id);
      }
    }
    KeyEventEmitter.on(KeyEvent.DelBlock, handler);
    return () => {
      KeyEventEmitter.off(KeyEvent.DelBlock, handler);
    }
  }, [selected, deleteSlice, channelId, slice.id]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    createContextMenu(e, [
      {
        name: "Delete",
        handler: () => { deleteSlice(channelId, slice.id) },
      }
    ]);
  }, [channelId, slice.id, deleteSlice]);

  return (
    <StyledAudioBlock
      ref={audioBlockRef}
      selected={selected}
      onMouseDown={mouseDownHandler}
      onMouseOver={cutMouseOverHandler}
      onMouseMove={cutMouseMoveHandler}
      onMouseLeave={cutMouseLeaveHandler}
      style={{ width, transform: `translateX(${offset}px)` }}
      onContextMenu={handleContextMenu}
    >
      <AudioName>{audio.fileName}</AudioName>
      {
        cursorType === FunctionBarCursorType.cut && cutHover && <CutLine ref={cutLineRef} />
      }
      <RollingIcon loaded={visualEffectImageLoaded} />
      <VisualEffectImage ref={visualEffectImageRef} style={{ transform: `translateX(${visualEffectImageOffset.current}px)`}} />
      <LeftStretcher
        onMouseDown={stretcherMouseDownHandler}
        data-type={StretchingType.left}
      />
      <RightStretcher
        onMouseDown={stretcherMouseDownHandler}
        data-type={StretchingType.right}
      />
    </StyledAudioBlock>
  );
}

export default connector(AudioBlock);
