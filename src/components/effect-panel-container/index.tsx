import React from 'react';
import { RootState } from '@redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { openedEffectSelector } from '@redux/selectors/audioEffect';
import EffectPanel from '@components/effect-panel';
import { StyledEffectPanelContainer } from './styled';

const mapState = (state: RootState) => ({
  openedEffectPanels: openedEffectSelector(state.audioEffect),
});

const connector = connect(mapState);
type Props = ConnectedProps<typeof connector>;

const EffectPanelContainer: React.FC<Props> = props => {
  const { openedEffectPanels } = props;
  return (
    <StyledEffectPanelContainer>
      {openedEffectPanels.map(v => (
        <EffectPanel channelId={v.channelId} effectId={v.effectId} key={v.effectId} />
      ))}
    </StyledEffectPanelContainer>
  );
}

export default connector(EffectPanelContainer);
