import React from 'react';
import { Audio } from '@redux/types/library';
import { ReactComponent as MusicIcon } from '@assets/svg/music.svg';
import { AudioIconWrapper, StyledAudioItem, AudioInfoFileName,
          AudioInfoWrapper, AudioInfoFileLength } from './styled';
import { millisecondToString } from '@utils/time';

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
        <AudioInfoFileLength>{millisecondToString(props.audioInfo.length, false)}</AudioInfoFileLength>
      </AudioInfoWrapper>
    </StyledAudioItem>
  );
}

export default AudioItem;
