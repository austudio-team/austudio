import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyledAudioBlock, AudioName } from './styled';
import { AudioSlice } from '@redux/types/channel';
import { RootState } from '@redux/reducers';
import { audioItemSelector } from '@redux/selectors/library';
import { connect, ConnectedProps } from 'react-redux';
import { getLength } from './utils';
import { isBlockSelectedSelector, zoomSelector } from '@redux/selectors/editor';
import { selectBlock } from '@redux/actions/editor';
import { updateSlice } from '@redux/actions/channel';

interface AudioBlockProps {
  slice: AudioSlice;
  channelId: string;
}

const mapState = (state: RootState, ownProps: AudioBlockProps) => ({
  audio: audioItemSelector(state.library, ownProps.slice.audioId),
  zoom: zoomSelector(state.editor),
  selected: isBlockSelectedSelector(state.editor, ownProps.slice.id),
});

const mapDispatch = {
  selectBlock,
  updateSlice,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & AudioBlockProps;

const AudioBlock: React.FC<Props> = props => {
  const { audio, slice, selected, selectBlock, zoom, updateSlice, channelId } = props;
  const length = getLength(slice, audio);
  const width = Math.ceil(length / zoom) + 2;
  const offset = Math.ceil(slice.offset / zoom);
  const audioBlockRef = useRef<HTMLDivElement>(null);
  const clickXRef = useRef<number>(0);
  const draggingX = useRef<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);

  const mouseDownHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selected) {
      selectBlock(slice.id);
    }
    setDragging(true);
    clickXRef.current = e.clientX;
    draggingX.current = offset;
  }, [slice.id, selected, selectBlock, setDragging, offset]);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        if (audioBlockRef.current) {
          const movement = e.clientX - clickXRef.current;
          draggingX.current = offset + movement;
          audioBlockRef.current.style.transform = `translateX(${draggingX.current}px)`;
        }
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging, offset]);

  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        setDragging(false);
        updateSlice(channelId, slice.id, {
          offset: draggingX.current * zoom,
        });
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging, channelId, slice.id, updateSlice, zoom]);

  return (
    <StyledAudioBlock
      ref={audioBlockRef}
      selected={selected}
      onMouseDown={mouseDownHandler}
      style={{ width, transform: `translateX(${offset}px)` }}
    >
      <AudioName>{audio.fileName}</AudioName>
    </StyledAudioBlock>
  );
}

export default connector(AudioBlock);
