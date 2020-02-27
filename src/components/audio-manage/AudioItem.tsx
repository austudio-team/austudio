import React from 'react';
import { Audio } from '@redux/types/library';
import { ReactComponent as MusicIcon } from '@assets/svg/music.svg';
import { AudioIconWrapper, StyledAudioItem, AudioInfoFileName,
          AudioInfoWrapper, AudioInfoFileLength } from './styled';

interface AudioItemProps {
  audioInfo: Audio;
}

const AudioItem: React.FC<AudioItemProps> = props => {
  return (
    <StyledAudioItem>
      <AudioIconWrapper>
        <MusicIcon />
      </AudioIconWrapper>
      <AudioInfoWrapper>
        <AudioInfoFileName>{props.audioInfo.fileName}</AudioInfoFileName>
        <AudioInfoFileLength>{props.audioInfo.length}</AudioInfoFileLength>
      </AudioInfoWrapper>
    </StyledAudioItem>
  );
}

export default AudioItem;
