import React, { useState, useCallback } from 'react';
import { AudioChannelContainer, TopChannel, MiddleChannel, BottomChannel, ChannelName, 
  ChannelButtonGroup, ChannelButton, Range, RangeContainer } from './styled';
import Tooltip from '@components/tooltip';
import { Dropdown } from '@components/dropdown';

const AudioChannel: React.FC = () => {
  const [vol, setVol] = useState<number>(100);
  const volHandler = useCallback((e: any) => {
    setVol(parseFloat(e.target.value));
  }, []);
  const volStr = 'Volumn(' + vol + '%)';
  const [panner, setPanner] = useState<number>(0);
  const pannerHandler = useCallback((e: any) => {
    setPanner(parseFloat(e.target.value));
  }, []);
  const pannerStr = 'Panner(' + panner + '%)';
  return (
    <AudioChannelContainer>
      <TopChannel>
        <ChannelName>Audio Channel</ChannelName>
        <ChannelButtonGroup>
          <Tooltip title="Solo"><ChannelButton>S</ChannelButton></Tooltip>
          <Tooltip title="Mute"><ChannelButton>M</ChannelButton></Tooltip>
          <Tooltip title="Record"><ChannelButton>R</ChannelButton></Tooltip>
        </ChannelButtonGroup>
      </TopChannel>
      <MiddleChannel>
        <RangeContainer>
          <span>V:</span>
          <Tooltip title={volStr}>
            <Range
              defaultValue="100"
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
              defaultValue="0"
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

export default AudioChannel;
