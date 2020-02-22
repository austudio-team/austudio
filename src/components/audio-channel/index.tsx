import React, { useState, useCallback } from 'react';
import { AudioChannelContainer, TopChannel, MiddleChannel, BottomChannel, ChannelName, 
  ChannelButtonGroup, ChannelButton, VolumnRange, PannerRange } from './styled';
import Tooltip from '@components/tooltip';

const AudioChannel: React.FC = () => {
  const [vol, setVol] = useState<number>(0);
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
        <Tooltip title={volStr}><VolumnRange defaultValue="100" onChange={volHandler} id="volume" type="range" min="0" max="100" step="1"></VolumnRange></Tooltip>
        <Tooltip title={pannerStr}><PannerRange defaultValue="0" onChange={pannerHandler} id="panner" type="range" min="-100" max="100" step="1"></PannerRange></Tooltip>
      </MiddleChannel>
      <BottomChannel></BottomChannel>
    </AudioChannelContainer>
  );
};

export default AudioChannel;
