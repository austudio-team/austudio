import React, {useEffect, useRef, useCallback, useState } from 'react';
import { EditorContainer } from '@components/styled';
import AudioChannel from '@components/audio-channel';
import { AudioChannelWrapper, TrackWrapper, TrackIndicator, AudioChannelScroller, TrackScroller } from './styled';
import Track from '@components/track';
import AudioManage from '@components/audio-manage';
import { scrollYLimiter, watchScrollHeight, watchEditorRect, indicatorLimiter } from './utils';
import { RootState } from '@redux/reducers';
import { channelListSelector } from '@redux/selectors/channel';
import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: RootState) => ({
  channelList: channelListSelector(state.channel),
});

const mapDispatch = {
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

  const { channelList } = props;

  useEffect(() => {
    watchScrollHeight(editorScrollHeight, channelWrapperRef);
  }, [channelList]);
  useEffect(() => {
    const handler = () => {
      watchEditorRect(editorHeight, editorWidth, editorRef);
    };
    handler();
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, []);
  useEffect(() => {
    if (editorRef.current) {
      const dom = editorRef.current;
      const handler = (e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const cWrapper = channelWrapperRef.current;
        const tWrapper = trackWrapperRef.current;
        if (cWrapper && tWrapper) {
          editorX.current += e.deltaX;
          scrollYLimiter(e, editorY, editorHeight, editorScrollHeight);
          cWrapper.style.top = `${editorY.current}px`;
          tWrapper.style.top = `${editorY.current}px`;
        }
      }
      dom.addEventListener('wheel', handler);
      return () => {
        dom.removeEventListener('wheel', handler);
      }
    }
  }, []);

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
        <TrackScroller ref={trackWrapperRef}>
        {
            channelList.map(v => (
              <Track key={v} />
            ))
          }
        </TrackScroller>
      </TrackWrapper>
    </EditorContainer>
  );
};

export default connector(Editor);
