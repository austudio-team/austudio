import React from 'react';
import { TrackContainer } from './styled';
import { RootState } from '@redux/reducers';
import { channelItemSelector } from '@redux/selectors/channel';
import { connect, ConnectedProps } from 'react-redux';
import AudioBlock from '@components/audio-block';

interface TrackProps {
  channelId: string;
}

const mapState = (state: RootState, ownProps: TrackProps) => ({
  channel: channelItemSelector(state.channel, ownProps.channelId),
});

const mapDispatch = {
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & TrackProps;

const Track: React.FC<Props> = props => {
  const { channel } = props;
  return (
    <TrackContainer>
      {
        channel.slices.map(v => (
          <AudioBlock slice={v} key={v.id} />
        ))
      }
    </TrackContainer>
  );
};

export default connector(Track);
