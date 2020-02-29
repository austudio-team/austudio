import React, {useEffect, useRef, useCallback, useState } from 'react';
import { EditorContainer } from '@components/styled';
import AudioChannel from '@components/audio-channel';
import { AudioChannelWrapper, TrackWrapper, TrackIndicator, AudioChannelScroller, TrackScroller } from './styled';
import Track from '@components/track';
import AudioManage from '@components/audio-manage';
import { scrollYLimiter, watchScrollHeight, watchEditorRect, indicatorLimiter, scrollXLimiter } from './utils';
import { RootState } from '@redux/reducers';
import { channelListSelector } from '@redux/selectors/channel';
import { connect, ConnectedProps } from 'react-redux';
import { selectBlock } from '@redux/actions/editor';
import VerticalScroller from '@components/vertical-scroller';
import { editorMarginTop, editorMarginBottom } from './constants';
import eventEmitter from '@utils/event';
import { EditorEvent, EditorScrollYShouldChangeEvent, EditorScrollXShouldChangeEvent } from '@events';
import ZoomSlider from '@components/zoom-slider';
import { maxLengthSelector, zoomSelector } from '@redux/selectors/editor';
import HorizontalScroller from '@components/horizontal-scroller';
import { usePrevious } from '@hooks';

const mapState = (state: RootState) => ({
  channelList: channelListSelector(state.channel),
  maxLength: maxLengthSelector(state.editor),
  zoom: zoomSelector(state.editor),
});

const mapDispatch = {
  selectBlock,
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

  const { channelList, selectBlock, maxLength, zoom } = props;

  const maxWidth = maxLength / zoom;

  const heightReporter = useCallback(() => {
    eventEmitter.emit(EditorEvent.editorHeightChange, {
      clientHeight: editorHeight.current - editorMarginTop,
      scrollHeight: editorScrollHeight.current + editorMarginBottom,
    });
  }, []);

  useEffect(() => {
    watchScrollHeight(editorScrollHeight, channelWrapperRef);
    heightReporter();
  }, [channelList, heightReporter]);

  useEffect(() => {
    const handler = () => {
      watchEditorRect(editorHeight, editorWidth, editorRef);
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
  }, [heightReporter]);
  
  const scrollYUpdater = useCallback((deltaY: number) => {
    const cWrapper = channelWrapperRef.current;
    const tWrapper = trackWrapperRef.current;
    if (cWrapper && tWrapper) {
      scrollYLimiter(deltaY, editorY, editorHeight, editorScrollHeight);
      cWrapper.style.transform = `translateY(${editorY.current}px)`;
      tWrapper.style.transform = `translateY(${editorY.current}px)`;
      eventEmitter.emit(EditorEvent.editorScrollYChanged, { scrollTop: -editorY.current });
    }
  }, []);

  const scrollXUpdater = useCallback((deltaX: number) => {
    const tWrapper = trackWrapperRef.current;
    if (tWrapper) {
      scrollXLimiter(deltaX, editorX, editorWidth, maxLength / zoom);
      tWrapper.style.transform = `translateX(${editorX.current}px)`;
      eventEmitter.emit(EditorEvent.editorScrollXChanged, { scrollLeft: -editorX.current });
    }
  }, [maxLength, zoom]);

  // 调整 zoom 时，调整 x 轴位置
  const prevZoom = usePrevious(zoom);
  useEffect(() => {
    const scale = zoom / prevZoom;
    editorX.current = editorX.current / scale;
    scrollXUpdater(0);
  }, [zoom, scrollXUpdater, prevZoom]);

  // 处理鼠标滚轮/触摸板滚动
  useEffect(() => {
    if (editorRef.current) {
      const dom = editorRef.current;
      const handler = (e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
        scrollYUpdater(e.deltaY);
        scrollXUpdater(e.deltaX);
      }
      dom.addEventListener('wheel', handler);
      return () => {
        dom.removeEventListener('wheel', handler);
      }
    }
  }, [scrollYUpdater, scrollXUpdater]);

  const [dragging, setDragging] = useState<boolean>(false);
  const indicatorMouseDown = useCallback(() => {
    setDragging(true);
  }, []);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        if (indicatorRef.current) {
          const left = indicatorLimiter(e.screenX, editorWidth.current);
          indicatorRef.current.style.left = `${left}px`;
        }
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

  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollYShouldChange, (p: EditorScrollYShouldChangeEvent) => {
      editorY.current = -p.scrollTop;
      scrollYUpdater(0);
    });
  }, [scrollYUpdater]);

  useEffect(() => {
    eventEmitter.on(EditorEvent.editorScrollXShouldChange, (p: EditorScrollXShouldChangeEvent) => {
      editorX.current = -p.scrollLeft;
      scrollXUpdater(0);
    });
  }, [scrollXUpdater]);

  const trackScrollerMouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    selectBlock(null);
  }, [selectBlock])

  return (
    <EditorContainer
      ref={editorRef}
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
          channelList.map(v => (
            <Track width={maxWidth} channelId={v} key={v} />
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
