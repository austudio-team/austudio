import React, { useRef, useEffect } from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ReactComponent as Plus } from '@assets/svg/plus.svg';
import Tooltip from '@components/tooltip';
import { TextButton } from '@components/text-button';
import { ButtonGroup, StopButton, PlayButton, RecordButton } from '@components/styled/functionBar';
import { Time } from './styled';
import { addChannel } from '@redux/actions/channel';
import { ConnectedProps, connect } from 'react-redux';
import { EditorEvent, EditorIndicatorChangeEvent } from '@events';
import eventEmitter from '@utils/event';
import { millisecondToString } from '@utils/time';
import { throttle } from 'lodash';

const mapState = () => ({
});

const mapDispatch = {
  addChannel,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const ControlBar: React.FC<Props> = props => {
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

  return (
    <FunctionBarcontainer>
      <ButtonGroup>
        <TextButton icon={Plus} text="Add Track" onClick={props.addChannel} width={181} />
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip title="Stop"><StopButton /></Tooltip>
        <Tooltip title="Play"><PlayButton /></Tooltip>
        <Tooltip title="Record" style={{ marginRight: 6 }}><RecordButton /></Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Time ref={timeRef}>0:00:00:000</Time>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default connector(ControlBar);
