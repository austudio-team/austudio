import React from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ReactComponent as Plus } from '@assets/svg/plus.svg';
import Tooltip from '@components/tooltip';
import { TextButton } from '@components/text-button';
import { ButtonGroup, StopButton, PlayButton, RecordButton } from '@components/styled/functionBar';
import { Time } from './styled';
import { addChannel } from '@redux/actions/channel';
import { ConnectedProps, connect } from 'react-redux';

const mapState = () => ({
});

const mapDispatch = {
  addChannel,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const ControlBar: React.FC<Props> = props => {
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
        <Time>0:00:00:00</Time>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default connector(ControlBar);
