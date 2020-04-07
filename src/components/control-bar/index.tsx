import React, { useRef, useEffect, useCallback, useState } from 'react';
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
import { millisecondToString, currentTime } from '@utils/time';
import { throttle } from 'lodash';
import { playingSelector, recordingSelector } from '@redux/selectors/functionBar';
import { requestPause, requestPlay, requestRecord, stopRecord } from '@redux/actions/functionBar';
import { KeyEventEmitter } from '@utils/keyevent';
import { KeyEvent } from '@utils/keyevent_declare';
import { getAudioController } from '@audio/AudioController';
import { TooltipOverlay } from '@layout/base';
import ReactDOM from 'react-dom';
import DeniedTip from './DeniedTip';
import PromptingTip from './PromptingTip';

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
  const { playing, recording, requestPause, requestRecord, requestPlay, stopRecord, addChannel } = props;
  const timeRef = useRef<HTMLDivElement>(null);
  const indicatorDragging = useRef<boolean>(false);
  const [prompting, setPrompting] = useState<boolean>(false);
  const [denied, setDenied] = useState<boolean>(false);

  // indicatorChangeEffect
  useEffect(() => {
    const handler = throttle(({ offset }: EditorIndicatorChangeEvent) => {
      if (timeRef.current) {
        timeRef.current.innerText = millisecondToString(offset);
      }
    }, 100, { leading: true, trailing: true });
    eventEmitter.on(EditorEvent.editorIndicatorShouldChange, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorIndicatorShouldChange, handler);
    }
  }, []);

  useEffect(() => {
    const handleDragStart = () => {
      indicatorDragging.current = true;
    };
    const handleDragEnd = () => {
      indicatorDragging.current = false;
      getAudioController().restartPlay();
    };
    eventEmitter.on(EditorEvent.editorIndicatorDragStart, handleDragStart);
    eventEmitter.on(EditorEvent.editorIndicatorDragEnd, handleDragEnd);
    return () => {
      eventEmitter.off(EditorEvent.editorIndicatorDragStart, handleDragStart);
      eventEmitter.off(EditorEvent.editorIndicatorDragEnd, handleDragEnd);
    }
  }, []);

  // playRafEffect
  useEffect(() => {
    if (playing) {
      let raf: number;
      const controller = getAudioController();
      let lastAudioTime: number;
      let lastRafTime: number;
      const updateTime = () => {
        if (timeRef.current && !indicatorDragging.current) {
          if (!lastAudioTime) lastAudioTime = controller.audioContext.currentTime;
          const nowTime = controller.audioContext.currentTime;
          currentTime.time += Math.floor((nowTime - lastAudioTime) * 1000) ;
          timeRef.current.innerText = millisecondToString(currentTime.time);
          eventEmitter.emit(EditorEvent.editorIndicatorChanged);
          lastAudioTime = nowTime;
        }
      }
      const handler = (time: number) => {
        if ((time - lastRafTime > 60 || !lastRafTime)) {
          lastRafTime = time;
          updateTime();
        }
        raf = requestAnimationFrame(handler);
      }
      raf = requestAnimationFrame(handler);
      return () => {
        cancelAnimationFrame(raf);
        updateTime();
      }
    }
  }, [playing]);

  const handlePlayClick = useCallback(() => {
    requestPlay();
    eventEmitter.emit(EditorEvent.requestPlay);
  }, [requestPlay]);


  const resultRef = useRef<PermissionStatus | null>(null);

  const handleRecordClick = useCallback(() => {
    const handler = () => {
      if (recording) {
        eventEmitter.emit(EditorEvent.requestPause);
        requestPause();
        stopRecord();
        getAudioController().stopRecord();
      }
      else {
        if (!playing) {
          handlePlayClick();
        }
        requestRecord();
        getAudioController().startRecord();
      }
    }
    const resultHandler = (result: PermissionStatus) => {
      if (result.state === 'granted') {
        handler();
        setPrompting(false)
        setDenied(false);
      } else if (result.state === 'prompt') {
        getAudioController().tryRecord();
        setDenied(false);
        setPrompting(true)
      } else if (result.state === 'denied') {
        getAudioController().tryRecord();
        setDenied(true);
        setPrompting(false);
      }
    }
    navigator.permissions.query({ name: 'microphone' }).then(result => {
      resultRef.current && (resultRef.current.onchange = null);
      resultRef.current = result;
      resultHandler(result);
      if (result.state === 'granted') return;
      result.onchange = function() {
        resultHandler(this);
        if (this.state === 'granted') {
          resultRef.current && (resultRef.current.onchange = null);
        }
      };
    });
  }, [recording, stopRecord, requestRecord, handlePlayClick, requestPause, playing]);

  const handlePauseClick = useCallback(() => {
    requestPause();
    if (recording) {
      handleRecordClick();
    }
    eventEmitter.emit(EditorEvent.requestPause);
  }, [requestPause, recording, handleRecordClick]);

  const handleCloseDeniedTip = useCallback(() => {
    resultRef.current && (resultRef.current.onchange = null);
    setDenied(false);
  }, []);

  const handleClosePromptingTip = useCallback(() => {
    resultRef.current && (resultRef.current.onchange = null);
    setPrompting(false);
  }, []);

  const handleStopClick = useCallback(() => {
    handlePauseClick();
    requestAnimationFrame(() => {
      eventEmitter.emit(EditorEvent.editorIndicatorShouldChange, { offset: 0 });
      currentTime.time = 0;
      eventEmitter.emit(EditorEvent.editorIndicatorChanged);
    })
  }, [handlePauseClick]);

  useEffect(() => {
    const playHandler = () => {
      if (playing) {
        handlePauseClick();
      } else {
        handlePlayClick();
      }
    };
    KeyEventEmitter.on(KeyEvent.TogglePlay, playHandler);
    KeyEventEmitter.on(KeyEvent.ToggleRecord, handleRecordClick);
    return () => {
      KeyEventEmitter.off(KeyEvent.TogglePlay, playHandler);
      KeyEventEmitter.off(KeyEvent.ToggleRecord, handleRecordClick);
    }
  }, [handlePlayClick, handlePauseClick, handleRecordClick, playing]);

  const handleAddChannelClick = useCallback(() => {
    addChannel();
  }, [addChannel]);

  return (
    <FunctionBarcontainer>
      <ButtonGroup>
        <TextButton icon={Plus} text="Add Track" onClick={handleAddChannelClick} width={181} />
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
          {prompting && ReactDOM.createPortal(<PromptingTip onClose={handleClosePromptingTip} />, TooltipOverlay!)}
          {denied && ReactDOM.createPortal(<DeniedTip onClose={handleCloseDeniedTip} />, TooltipOverlay!)}
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Time ref={timeRef}>0:00:00:000</Time>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default connector(ControlBar);
