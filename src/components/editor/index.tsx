import React, {useEffect, useRef } from 'react';
import { EditorContainer } from '@components/styled';
import AudioChannel from '@components/audio-channel';
import { AudioChannelWrapper, TrackWrapper, TrackIndicator, AudioChannelScroller, TrackScroller } from './styled';
import Track from '@components/track';
import AudioManage from '@components/audio-manage';
import { watchHeight, scrollYLimiter, watchScrollHeight } from './utils';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const channelWrapperRef = useRef<HTMLDivElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const editorY = useRef<number>(0);
  const editorX = useRef<number>(0);
  const editorHeight = useRef<number>(0);
  const editorScrollHeight = useRef<number>(0);
  useEffect(() => {
    watchScrollHeight(editorScrollHeight, channelWrapperRef);
  }, []);
  useEffect(() => {
    const handler = () => {
      watchHeight(editorHeight, editorRef);
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
  return (
    <EditorContainer ref={editorRef}>
      <AudioManage />
      <AudioChannelWrapper>
        <AudioChannelScroller ref={channelWrapperRef}>
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
          <AudioChannel />
        </AudioChannelScroller>
      </AudioChannelWrapper>
      <TrackIndicator ref={indicatorRef}/>
      <TrackWrapper>
        <TrackScroller ref={trackWrapperRef}>
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
        </TrackScroller>
      </TrackWrapper>
    </EditorContainer>
  );
};

export default Editor;
