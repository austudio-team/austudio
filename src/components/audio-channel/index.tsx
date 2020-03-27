import React, { useCallback, useState } from 'react';
import { AudioChannelContainer, TopChannel, MiddleChannel, BottomChannel, ChannelName, 
  ChannelButtonGroup, ChannelButton, RangeContainer, RecordButton } from './styled';
import Tooltip from '@components/tooltip';
import { Dropdown } from '@components/dropdown';
import { RootState } from '@redux/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { channelItemSelector } from '@redux/selectors/channel';
import { updateMute, updateRecord, updatePan,
        updateName, updateSolo, updateVol, deleteChannel } from '@redux/actions/channel';
import { StyledSlider } from '@components/styled/slider';
import { createContextMenu } from '@utils/context-menu';
import ChannelNameInput from './ChannelNameInput';

interface AudioChannelProps {
  channelId: string;
}

const mapState = (state: RootState, ownProps: AudioChannelProps) => ({
  channel: channelItemSelector(state.channel, ownProps.channelId),
});

const mapDispatch = {
  updateMute,
  updateRecord,
  updatePan,
  updateName,
  updateSolo,
  updateVol,
  deleteChannel,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioChannelProps;

const AudioChannel: React.FC<Props> = props => {
  const { channel, updateMute, updateRecord,
          updatePan, updateSolo, updateVol, updateName,
          deleteChannel } = props;

  const [editing, setEditing] = useState<boolean>(false);

  const volHandler = useCallback((e: number) => {
    updateVol(channel.id, e);
  }, [channel.id, updateVol]);
  const volStr = 'Volumn(' + channel.vol + '%)';

  const pannerHandler = useCallback((e: number) => {
    updatePan(channel.id, e);
  }, [channel.id, updatePan]);
  const pannerStr = 'Panner(' + channel.pan + '%)';

  const handleSolo = useCallback(() => {
    updateSolo(channel.id, !channel.solo);
  }, [channel.id, channel.solo, updateSolo]);

  const handleMute = useCallback(() => {
    updateMute(channel.id, !channel.mute);
  }, [channel.id, channel.mute, updateMute]);

  const handleRecord = useCallback(() => {
    updateRecord(channel.id, !channel.record);
  }, [channel.id, channel.record, updateRecord]);

  const handleNameDoubleClick = useCallback(() => {
    if (!editing) setEditing(true);
  }, [editing, setEditing]);

  const blurHandler = useCallback((value: string) => {
    if (value !== channel.name) {
      updateName(channel.id, value);
    }
    setEditing(false);
  }, [setEditing, channel.id, channel.name, updateName]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    createContextMenu(e, [
      {
        name: "Rename",
        handler: () => { setEditing(true) },
      },
      'divider',
      {
        name: "Insert above",
        handler: () => { console.log('hello') },
      },
      {
        name: "Insert below",
        handler: () => { console.log('hello') },
      },
      'divider',
      {
        name: "Move up",
        handler: () => { console.log('hello') },
      },
      {
        name: "Move down",
        handler: () => { console.log('hello') },
      },
      'divider',
      {
        name: "Delete",
        handler: () => { deleteChannel(channel.id) },
      }
    ]);
  }, [setEditing, deleteChannel, channel.id]);

  return (
    <AudioChannelContainer onContextMenu={handleContextMenu}>
      <TopChannel>
        <ChannelName onDoubleClick={handleNameDoubleClick}>
          {channel.name}
          {editing && <ChannelNameInput blurHandler={blurHandler} defaultValue={channel.name} />}
        </ChannelName>
        <ChannelButtonGroup>
          <Tooltip title="Solo">
            <ChannelButton active={channel.solo} onClick={handleSolo}>S</ChannelButton>
          </Tooltip>
          <Tooltip title="Mute">
            <ChannelButton active={channel.mute} onClick={handleMute}>M</ChannelButton>
          </Tooltip>
          <Tooltip title="Record">
            <RecordButton active={channel.record} onClick={handleRecord}>R</RecordButton>
          </Tooltip>
        </ChannelButtonGroup>
      </TopChannel>
      <MiddleChannel>
        {/* <StyledSelect>
          <Option value="123">Hello1</Option>
          <Option value="234">Hello2</Option>
        </StyledSelect> */}
        <RangeContainer>
          <span>V:</span>
          <Tooltip title={volStr}>
            <StyledSlider
              style={{ width: 162, marginLeft: 12 }}
              value={channel.vol}
              onChange={volHandler}
              min={0}
              max={125}
              step={1}
            />
          </Tooltip>
        </RangeContainer>
        <RangeContainer>
          <span>P:</span>
          <Tooltip title={pannerStr}>
            <StyledSlider
              style={{ width: 162, marginLeft: 12 }}
              value={channel.pan}
              onChange={pannerHandler}
              min={-100}
              max={100}
              step={1}
            />
          </Tooltip>
        </RangeContainer>
      </MiddleChannel>
      <BottomChannel>
        <Dropdown value="Effects" channelId={channel.id} width={200} margin="0 0 6px 6px" />
      </BottomChannel>
    </AudioChannelContainer>
  );
};

export default connector(AudioChannel);
