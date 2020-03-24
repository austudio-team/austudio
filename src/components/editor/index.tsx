import React, {useEffect, useRef, useCallback, useState } from 'react';
import { EditorContainer } from '@components/styled';
import AudioChannel from '@components/audio-channel';
import { AudioChannelWrapper, TrackWrapper, TrackIndicator, AudioChannelScroller, TrackScroller } from './styled';
import Track from '@components/track';
import AudioManage from '@components/audio-manage';
import { scrollYLimiter, watchScrollHeight, watchEditorRect, scrollXLimiter, indicatorLimiter } from './utils';
import { RootState } from '@redux/reducers';
import { channelListSelector } from '@redux/selectors/channel';
import { connect, ConnectedProps } from 'react-redux';
import { selectBlock, updateZoom } from '@redux/actions/editor';
import VerticalScroller from '@components/vertical-scroller';
import { editorMarginTop, editorMarginBottom, editorChannelWidth, scrollerSize } from './constants';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorScrollYShouldChangeEvent, EditorScrollXShouldChangeEvent, EditorRequestAutoScrollEvent } from '@events';
import ZoomSlider from '@components/zoom-slider';
import { maxLengthSelector, zoomSelector } from '@redux/selectors/editor';
import HorizontalScroller from '@components/horizontal-scroller';
import { usePrevious } from '@hooks';
import { isMac } from '@utils/browser';
import { getAudioController } from '@audio/AudioController';

const mapState = (state: RootState) => ({
  channelList: channelListSelector(state.channel),
  maxLength: maxLengthSelector(state.editor),
  zoom: zoomSelector(state.editor),
});

const mapDispatch = {
  selectBlock,
  updateZoom,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Editor: React.FC<Props> = props => {
  const editorRef = useRef<HTMLDivElement>(null);
  const channelWrapperRef = useRef<HTMLDivElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const editorY = useRef<number>(0);
  const editorX = useRef<number>(0);
  const editorHeight = useRef<number>(0);
  const editorWidth = useRef<number>(0);
  const editorScrollHeight = useRef<number>(0);
  const indicatorDraggingX = useRef<number>(-1);
  const indicatorOffset = useRef<number>(0);

  const { channelList, selectBlock, maxLength, zoom, updateZoom } = props;

  const maxWidth = maxLength / zoom;

  const heightReporter = useCallback(() => {
    eventEmitter.emit(EditorEvent.editorHeightChange, {
      clientHeight: editorHeight.current - editorMarginTop,
      scrollHeight: editorScrollHeight.current + editorMarginBottom,
    });
  }, []);

  const scrollYUpdater = useCallback((deltaY: number) => {
    scrollYLimiter(deltaY, editorY, editorHeight, editorScrollHeight);
    eventEmitter.emit(EditorEvent.editorScrollYChanged, { scrollTop: -editorY.current });
  }, []);

  const scrollXUpdater = useCallback((deltaX: number) => {
    scrollXLimiter(deltaX, editorX, editorWidth, maxLength / zoom);
    eventEmitter.emit(EditorEvent.editorScrollXChanged, { scrollLeft: -editorX.current });
  }, [maxLength, zoom]);

  const rerenderIndicator = useCallback(() => {
    if (indicatorDraggingX.current !== -1) {
      indicatorOffset.current = (indicatorDraggingX.current - editorChannelWidth - editorX.current) * zoom;
      eventEmitter.emit(EditorEvent.editorIndicatorChanged, {
        offset: indicatorOffset.current,
      });
    }
    const offset = indicatorOffset.current / zoom;

    if (indicatorRef.current) {
      if (offset < -editorX.current || offset > -editorX.current + editorWidth.current - editorChannelWidth - scrollerSize) {
        indicatorRef.current.style.visibility = 'hidden';
      } else {
        indicatorRef.current.style.visibility = 'visible';
        indicatorRef.current.style.left = `${editorChannelWidth + offset + editorX.current}px`;
      }
    }
  }, [zoom]);

  const rerenderScroll = useCallback(() => {
    const cWrapper = channelWrapperRef.current;
    const tWrapper = trackWrapperRef.current;
    if (cWrapper && tWrapper) {
      cWrapper.style.transform = `translateY(${editorY.current}px)`;
      tWrapper.style.transform = `translateX(${editorX.current}px) translateY(${editorY.current}px)`;
      rerenderIndicator();
    }
  }, [rerenderIndicator]);

  // channelListChangeEffect
  useEffect(() => {
    watchScrollHeight(editorScrollHeight, channelWrapperRef);
    heightReporter();
  }, [channelList, heightReporter]);

  // windowResizeEffect
  useEffect(() => {
    const handler = () => {
      watchEditorRect(editorHeight, editorWidth, editorRef);
      scrollYUpdater(0);
      rerenderScroll();
      heightReporter();
      eventEmitter.emit(EditorEvent.editorWidthChange, {
        clientWidth: editorWidth.current,
      });
    };
    handler();
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [heightReporter, rerenderScroll, scrollYUpdater]);

  // 调整 zoom 时，调整 x 轴位置
  // zoomChangeEffect
  const prevZoom = usePrevious(zoom);
  useEffect(() => {
    const scale = zoom / prevZoom;
    editorX.current = editorX.current / scale;
    scrollXUpdater(0);
    rerenderScroll();
  }, [zoom, scrollXUpdater, prevZoom, rerenderScroll]);

  // 处理鼠标滚轮/触摸板滚动
  // mouseWheelEffect
  useEffect(() => {
    if (editorRef.current) {
      const dom = editorRef.current;
      const handler = (e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isMac ? e.metaKey : e.ctrlKey) {
          if (zoom > 10 && e.deltaY < 0) {
            updateZoom(zoom - 10);
          } else if (zoom < 300 && e.deltaY > 0) {
            updateZoom(zoom + 10);
          }
        } else {
          scrollYUpdater(e.deltaY);
          scrollXUpdater(e.deltaX);
          rerenderScroll();
        }
      }
      dom.addEventListener('wheel', handler);
      return () => {
        dom.removeEventListener('wheel', handler);
      }
    }
  }, [scrollYUpdater, scrollXUpdater, rerenderScroll, zoom, updateZoom]);

  const [dragging, setDragging] = useState<boolean>(false);
  const indicatorMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
  }, []);

  // mouseMoveEffect
  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        if (e.clientX < editorChannelWidth + 20) {
          const deltaX = e.clientX - editorChannelWidth - 20;
          eventEmitter.emit(EditorEvent.editorRequestAutoScrollX, {
            delta: deltaX,
          });
        } else if (e.clientX > editorWidth.current - 100) {
          const deltaX = 100 - (editorWidth.current - e.clientX);
          eventEmitter.emit(EditorEvent.editorRequestAutoScrollX, {
            delta: deltaX,
          });
        } else {
          eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
        }
        const left = indicatorLimiter(e.clientX, editorWidth.current);
        indicatorDraggingX.current = left;
        rerenderIndicator();
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging, zoom, rerenderIndicator]);

  // mouseUpEffect
  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        eventEmitter.emit(EditorEvent.editorCancelAutoScrollX);
        setDragging(false);
        requestAnimationFrame(() => {
          rerenderIndicator();
          indicatorDraggingX.current = -1;
        });
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging, rerenderIndicator]);

  // scrollYShouldChangeEffect
  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollYShouldChange, (p: EditorScrollYShouldChangeEvent) => {
      editorY.current = -p.scrollTop;
      scrollYUpdater(0);
      rerenderScroll();
    });
  }, [scrollYUpdater, rerenderScroll]);

  // scrollXShouldChangeEffect
  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollXShouldChange, (p: EditorScrollXShouldChangeEvent) => {
      editorX.current = -p.scrollLeft;
      scrollXUpdater(0);
      rerenderScroll();
    });
  }, [scrollXUpdater, rerenderScroll]);

  const trackScrollerMouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    selectBlock(null);
  }, [selectBlock])

  // 自动滚动逻辑
  // autoScrollXEffect
  const autoScrollXDelta = useRef<number>(0);
  const autoScrollXEnabled = useRef<boolean>(false);
  useEffect(() => {
    const raf = () => {
      scrollXUpdater(autoScrollXDelta.current);
      rerenderScroll();
      if (autoScrollXEnabled.current) {
        requestAnimationFrame(raf);
      }
    }
    const handler = ({ delta }: EditorRequestAutoScrollEvent) => {
      autoScrollXDelta.current = delta;
      if (!autoScrollXEnabled.current) {
        autoScrollXEnabled.current = true;
        requestAnimationFrame(raf);
      }
    };
    const cancelHandler = () => {
      autoScrollXEnabled.current = false;
    }
    eventEmitter.on(EditorEvent.editorRequestAutoScrollX, handler);
    eventEmitter.on(EditorEvent.editorCancelAutoScrollX, cancelHandler);
    return () => {
      eventEmitter.off(EditorEvent.editorRequestAutoScrollX, handler);
      eventEmitter.off(EditorEvent.editorCancelAutoScrollX, cancelHandler);
    }
  }, [scrollXUpdater, rerenderScroll]);

  const autoScrollYDelta = useRef<number>(0);
  const autoScrollYEnabled = useRef<boolean>(false);
  // autoScrollYEffect
  useEffect(() => {
    const raf = () => {
      scrollYUpdater(autoScrollYDelta.current);
      rerenderScroll();
      if (autoScrollYEnabled.current) {
        requestAnimationFrame(raf);
      }
    }
    const handler = ({ delta }: EditorRequestAutoScrollEvent) => {
      autoScrollYDelta.current = delta;
      if (!autoScrollYEnabled.current) {
        autoScrollYEnabled.current = true;
        requestAnimationFrame(raf);
      }
    };
    const cancelHandler = () => {
      autoScrollYEnabled.current = false;
    }
    eventEmitter.on(EditorEvent.editorRequestAutoScrollY, handler);
    eventEmitter.on(EditorEvent.editorCancelAutoScrollY, cancelHandler);
    return () => {
      eventEmitter.off(EditorEvent.editorRequestAutoScrollY, handler);
      eventEmitter.off(EditorEvent.editorCancelAutoScrollY, cancelHandler);
    }
  }, [scrollYUpdater, rerenderScroll]);

  const dragOverHandler = useCallback(e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const audioFileDropHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    const audioController = getAudioController();
    if (files) {
      audioController.handleFile(files);
    }
  }, []);

  return (
    <EditorContainer
      ref={editorRef}
      onDrop={audioFileDropHandler}
      onDragOver={dragOverHandler}
    >
      <AudioManage />
      <AudioChannelWrapper>
        <AudioChannelScroller ref={channelWrapperRef}>
          {
            channelList.map(v => (
              <AudioChannel channelId={v} key={v} />
            ))
          }
        </AudioChannelScroller>
      </AudioChannelWrapper>
      <TrackIndicator
        ref={indicatorRef}
        onMouseDown={indicatorMouseDown}
      />
      <TrackWrapper>
        <TrackScroller ref={trackWrapperRef} onMouseDown={trackScrollerMouseDownHandler}>
        {
          channelList.map((v, i) => (
            <Track width={maxWidth} channelId={v} key={v} index={i} />
          ))
        }
        </TrackScroller>
      </TrackWrapper>
      <VerticalScroller />
      <ZoomSlider />
      <HorizontalScroller maxWidth={maxWidth} />
    </EditorContainer>
  );
};

export default connector(Editor);
