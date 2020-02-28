import React, { useCallback } from 'react';
import { Audio } from '@redux/types/library';
import { ReactComponent as MusicIcon } from '@assets/svg/music.svg';
import { AudioIconWrapper, StyledAudioItem, AudioInfoFileName,
          AudioInfoWrapper, AudioInfoFileLength } from './styled';
import { millisecondToString } from '@utils/time';

interface AudioItemProps {
  audioInfo: Audio;
  onDragStart: (audioId: string) => void;
  onDragEnd: () => void;
}

const AudioItem: React.FC<AudioItemProps> = props => {
  const { onDragStart, onDragEnd, audioInfo } = props;

  const onDragHanlder = useCallback(() => {
    onDragStart(audioInfo.id);
  }, [audioInfo.id, onDragStart]);

  return (
    <StyledAudioItem draggable onDragEnd={onDragEnd} onDragStart={onDragHanlder}>
      <AudioIconWrapper>
        <MusicIcon />
      </AudioIconWrapper>
      <AudioInfoWrapper>
        <AudioInfoFileName>{audioInfo.fileName}</AudioInfoFileName>
        <AudioInfoFileLength>{millisecondToString(audioInfo.length, false)}</AudioInfoFileLength>
      </AudioInfoWrapper>
    </StyledAudioItem>
  );
}

export default AudioItem;
