import React from 'react';
import { EditorContainer } from '@components/styled';
import AudioChannel from '@components/audio-channel';
import { AudioChannelWrapper, TrackWrapper, TrackIndicator } from './styled';
import Track from '@components/track';

const Editor: React.FC = () => {
  return (
    <EditorContainer>
      <AudioChannelWrapper>
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
        <AudioChannel />
      </AudioChannelWrapper>
      <TrackWrapper>
        <TrackIndicator />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
      </TrackWrapper>
    </EditorContainer>
  );
};

export default Editor;
