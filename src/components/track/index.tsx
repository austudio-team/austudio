import React, { useCallback, useEffect, useRef } from 'react';
import { TrackContainer } from './styled';
import { RootState } from '@redux/reducers';
import { channelItemSelector } from '@redux/selectors/channel';
import { connect, ConnectedProps } from 'react-redux';
import AudioBlock from '@components/audio-block';
import { audioDrop } from '@redux/actions/editor';
import { zoomSelector } from '@redux/selectors/editor';
import { editorChannelWidth } from '@components/editor/constants';
import { EditorScrollXChangeEvent, EditorEvent } from '@events';
import eventEmitter from '@utils/event';

interface TrackProps {
  channelId: string;
  width: number;
}

const mapState = (state: RootState, ownProps: TrackProps) => ({
  channel: channelItemSelector(state.channel, ownProps.channelId),
  zoom: zoomSelector(state.editor),
});

const mapDispatch = {
  audioDrop,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & TrackProps;

const Track: React.FC<Props> = props => {
  const { channel, audioDrop, zoom, width } = props;

  const scrollLeftRef = useRef<number>(0);

  const dropHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    audioDrop(channel.id, Math.floor((e.clientX - editorChannelWidth + scrollLeftRef.current) * zoom));
  }, [channel.id, audioDrop, zoom]);

  const dragOverHandler = useCallback(e => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const handler = ({ scrollLeft }: EditorScrollXChangeEvent) => {
      scrollLeftRef.current = scrollLeft;
    };
    eventEmitter.on(EditorEvent.editorScrollXChanged, handler);
    return () => {
      eventEmitter.off(EditorEvent.editorScrollXChanged, handler);
    }
  }, []);

  return (
    <TrackContainer style={{ width }} onDrop={dropHandler} onDragOver={dragOverHandler}>
      {
        channel.slices.map(v => (
          <AudioBlock channelId={channel.id} slice={v} key={v.id} />
        ))
      }
    </TrackContainer>
  );
};

export default connector(Track);
