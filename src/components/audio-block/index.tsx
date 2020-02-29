import React, { useCallback } from 'react';
import { StyledAudioBlock, AudioName } from './styled';
import { AudioSlice } from '@redux/types/channel';
import { RootState } from '@redux/reducers';
import { audioItemSelector } from '@redux/selectors/library';
import { connect, ConnectedProps } from 'react-redux';
import { getLength } from './utils';
import { isBlockSelectedSelector, zoomSelector } from '@redux/selectors/editor';
import { selectBlock } from '@redux/actions/editor';

interface AudioBlockProps {
  slice: AudioSlice;
}

const mapState = (state: RootState, ownProps: AudioBlockProps) => ({
  audio: audioItemSelector(state.library, ownProps.slice.audioId),
  zoom: zoomSelector(state.editor),
  selected: isBlockSelectedSelector(state.editor, ownProps.slice.id),
});

const mapDispatch = {
  selectBlock,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioBlockProps;

const AudioBlock: React.FC<Props> = props => {
  const { audio, slice, selected, selectBlock, zoom } = props;
  const length = getLength(slice, audio);
  const width = Math.ceil(length / zoom) + 2;
  const offset = Math.ceil(slice.offset / zoom);

  const mouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selected) {
      selectBlock(slice.id);
    }
  }, [slice.id, selected, selectBlock]);



  return (
    <StyledAudioBlock
      selected={selected}
      onMouseDown={mouseDownHandler}
      style={{ width, transform: `translateX(${offset}px)` }}
    >
      <AudioName>{audio.fileName}</AudioName>
    </StyledAudioBlock>
  );
}

export default connector(AudioBlock);
