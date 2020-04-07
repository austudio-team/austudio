import React, { useEffect, useRef } from 'react';
import { StyledRecoringBlock, AudioName } from './styled';
import { getAudioController, AudioController } from '@audio/AudioController';
import { currentTime } from '@utils/time';
import { zoomSelector } from '@redux/selectors/editor';
import { RootState } from '@redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import eventEmitter from '@utils/event';
import { AudioControllerEvent } from '@events/audioController';

const mapState = (state: RootState) => ({
  zoom: zoomSelector(state.editor),
});

const mapDispatch = {
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const RecordingBlock: React.FC<Props> = ({ zoom }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const audioControllerRef = useRef<AudioController>(getAudioController());
  useEffect(() => {
    let rafId = 0;
    let ready = false;
    const readyHandler = () => {
      ready = true;
    }
    eventEmitter.on(AudioControllerEvent.AUDIO_CONTROLLER_RECORD_STARTED, readyHandler);
    const raf = () => {
      const offset = audioControllerRef.current.recordStartOffset;
      const now = currentTime.time;
      if (blockRef.current && ready) {
        const style = blockRef.current.style;
        style.left = `${Math.ceil(offset / zoom)}px`;
        style.width = `${Math.ceil((now - offset) / zoom)}px`;
        style.display = 'block';
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      eventEmitter.off(AudioControllerEvent.AUDIO_CONTROLLER_RECORD_STARTED, readyHandler);
    }
  }, [zoom]);
  return <StyledRecoringBlock ref={blockRef}><AudioName>Recording...</AudioName></StyledRecoringBlock>
}

export default connector(RecordingBlock);
