import React, { useRef, useEffect, useCallback } from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ReactComponent as Plus } from '@assets/svg/plus.svg';
import Tooltip from '@components/tooltip';
import { TextButton } from '@components/text-button';
import { ButtonGroup, StopButton, PlayButton, RecordButton, PauseButton } from '@components/styled/functionBar';
import { RootState } from '@redux/reducers';
import { Time } from './styled';
import { addChannel } from '@redux/actions/channel';
import { ConnectedProps, connect } from 'react-redux';
import { EditorEvent, EditorIndicatorChangeEvent } from '@events';
import eventEmitter from '@utils/event';
import { millisecondToString } from '@utils/time';
import { throttle } from 'lodash';
import { playingSelector, recordingSelector } from '@redux/selectors/functionBar';
import { requestPause, requestPlay, requestRecord, stopRecord } from '@redux/actions/functionBar';

const mapState = (state: RootState) => ({
  playing: playingSelector(state.functionBar),
  recording: recordingSelector(state.functionBar),
});

const mapDispatch = {
  addChannel,
  requestPause,
  requestPlay,
  requestRecord,
  stopRecord,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const ControlBar: React.FC<Props> = props => {
  const { playing, recording, requestPause, requestRecord, requestPlay, stopRecord } = props;
  const timeRef = useRef<HTMLDivElement>(null);

  // indicatorChangeEffect
  useEffect(() => {
    const handler = throttle(({ offset }: EditorIndicatorChangeEvent) => {
      if (timeRef.current) {
        timeRef.current.innerText = millisecondToString(offset);
      }
    }, 100, { leading: true, trailing: true });
    eventEmitter.on(EditorEvent.editorIndicatorChanged, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorIndicatorChanged, handler);
    }
  }, []);

  const handlePlayClick = useCallback(() => {
    requestPlay();
    eventEmitter.emit('requestPlay');
  }, [requestPlay]);

  const handlePauseClick = useCallback(() => {
    requestPause();
  }, [requestPause]);

  const handleRecordClick = useCallback(() => {
    if (recording) stopRecord();
    else requestRecord();
  }, [recording, stopRecord, requestRecord]);

  const handleStopClick = useCallback(() => {
    requestPause();
    // todo...
  }, [requestPause]);

  return (
    <FunctionBarcontainer>
      <ButtonGroup>
        <TextButton icon={Plus} text="Add Track" onClick={props.addChannel} width={181} />
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip title="Stop">
          <StopButton onClick={handleStopClick} />
        </Tooltip>
        <Tooltip title="Play">
          {playing ?
            <PauseButton onClick={handlePauseClick} /> :
            <PlayButton onClick={handlePlayClick} />
          }
        </Tooltip>
        <Tooltip title="Record" style={{ marginRight: 6 }}>
          <RecordButton onClick={handleRecordClick} active={recording} />
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Time ref={timeRef}>0:00:00:000</Time>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default connector(ControlBar);
