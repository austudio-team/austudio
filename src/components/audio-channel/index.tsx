import React, { useState, useCallback } from 'react';
import { AudioChannelContainer, TopChannel, MiddleChannel, BottomChannel, ChannelName, 
  ChannelButtonGroup, ChannelButton, Range, RangeContainer, RecordButton } from './styled';
import Tooltip from '@components/tooltip';
import { Dropdown } from '@components/dropdown';
import { RootState } from '@redux/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { channelItemSelector } from '@redux/selectors/channel';
import { updateMute, updateRecord, updatePan,
        updateName, updateSolo, updateVol } from '@redux/actions/channel';

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
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioChannelProps;

const AudioChannel: React.FC<Props> = props => {
  const { channel, updateMute, updateRecord,
          updatePan, updateName, updateSolo, updateVol } = props;
  const volHandler = useCallback((e: any) => {
    updateVol(channel.id, parseInt(e.target.value));
  }, []);
  const volStr = 'Volumn(' + channel.vol + '%)';
  const pannerHandler = useCallback((e: any) => {
    updatePan(channel.id, parseInt(e.target.value));
  }, []);
  const pannerStr = 'Panner(' + channel.pan + '%)';
  const handleSolo = useCallback(() => {
    updateSolo(channel.id, !channel.solo);
  }, [channel, updateSolo]);
  const handleMute = useCallback(() => {
    updateMute(channel.id, !channel.mute);
  }, [channel, updateMute]);
  const handleRecord = useCallback(() => {
    updateRecord(channel.id, !channel.record);
  }, [channel, updateRecord]);
  return (
    <AudioChannelContainer>
      <TopChannel>
        <ChannelName>{channel.name}</ChannelName>
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
        <RangeContainer>
          <span>V:</span>
          <Tooltip title={volStr}>
            <Range
              defaultValue={channel.vol}
              onChange={volHandler}
              id="volume"
              type="range"
              min="0"
              max="100"
              step="1"
            />
          </Tooltip>
        </RangeContainer>
        <RangeContainer>
          <span>P:</span>
          <Tooltip title={pannerStr}>
            <Range
              value={channel.pan}
              onChange={pannerHandler}
              id="panner"
              type="range"
              min="-100"
              max="100"
              step="1"
            />
          </Tooltip>
        </RangeContainer>
      </MiddleChannel>
      <BottomChannel>
        <Dropdown value="Effects" width={200} margin="0 0 6px 6px" />
      </BottomChannel>
    </AudioChannelContainer>
  );
};

export default connector(AudioChannel);
