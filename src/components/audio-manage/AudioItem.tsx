import React, { useCallback } from 'react';
import { Audio } from '@redux/types/library';
import { ReactComponent as MusicIcon } from '@assets/svg/music.svg';
import { AudioIconWrapper, StyledAudioItem, AudioInfoFileName,
          AudioInfoWrapper, AudioInfoFileLength, DeleteIcon } from './styled';
import { millisecondToString } from '@utils/time';
import { connect, ConnectedProps } from 'react-redux';
import { requestDeleteAudio } from '@redux/actions/library';

interface AudioItemProps {
  audioInfo: Audio;
  onDragStart: (audioId: string) => void;
  onDragEnd: () => void;
}

const mapState = () => ({
});

const mapDispatch = {
  deleteAudio: requestDeleteAudio,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioItemProps;

const AudioItem: React.FC<Props> = props => {
  const { onDragStart, onDragEnd, audioInfo, deleteAudio } = props;

  const onDragHanlder = useCallback(() => {
    onDragStart(audioInfo.id);
  }, [audioInfo.id, onDragStart]);

  const handleDeleteClick = useCallback(() => {
    deleteAudio(audioInfo.id);
  },[deleteAudio, audioInfo.id]);

  return (
    <StyledAudioItem draggable onDragEnd={onDragEnd} onDragStart={onDragHanlder}>
      <AudioIconWrapper>
        <MusicIcon />
      </AudioIconWrapper>
      <AudioInfoWrapper>
        <AudioInfoFileName>{audioInfo.fileName}</AudioInfoFileName>
        <AudioInfoFileLength>{millisecondToString(audioInfo.length, false)}</AudioInfoFileLength>
      </AudioInfoWrapper>
      <DeleteIcon onClick={handleDeleteClick} />
    </StyledAudioItem>
  );
}

export default connector(AudioItem);
