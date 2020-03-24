import React, { useRef, useCallback } from 'react';
import { StyledSlider } from '@components/styled/slider';
import Tooltip from '@components/tooltip';
import { Effect } from '@redux/types/audioEffect';
import { modifyEffect } from '@redux/actions/audioEffect';
import { RootState } from '@redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { EffectRangeContainer, EffectPanelContainer } from '@components/styled/effect';

interface CompressorPannelProps {
  channelId: string;
  effect: Effect;
}

const mapState = (state: RootState, ownProps: CompressorPannelProps) => ({
});

const mapDispatch = {
  modifyEffect
};

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector> & CompressorPannelProps;

const CompressorPannel: React.FC<Props> = props => {
  const {channelId, effect, modifyEffect} = props;
  const attack = useRef<number>(0);
  const release = useRef<number>(1);
  const ratio = useRef<number>(10);
  const threshold = useRef<number>(0);
  const gain = useRef<number>(1);

  const attackHandler = useCallback((a: number) => {
    attack.current = a;
    modifyEffect(channelId, effect.id, {attack: a});
  }, [channelId, effect, modifyEffect]);
  const attackStr = 'Attack:' + attack.current;

  const releaseHandler = useCallback((r: number) => {
    release.current = r;
    modifyEffect(channelId, effect.id, {release: r});
  }, [channelId, effect, modifyEffect]);
  const releaseStr = 'Release:' + release.current;

  const ratioHandler = useCallback((r: number) => {
    ratio.current = r;
    modifyEffect(channelId, effect.id, {ratio: r});
  }, [channelId, effect, modifyEffect]);
  const ratioStr = 'Ratio:' + ratio.current;

  const thresholdHandler = useCallback((t: number) => {
    threshold.current = t;
    modifyEffect(channelId, effect.id, {threshold: t});
  }, [channelId, effect, modifyEffect]);
  const thresholdStr = 'Threshold:' + threshold.current;

  const gainHandler = useCallback((g: number) => {
    gain.current = g;
    modifyEffect(channelId, effect.id, {gain: g});
  }, [channelId, effect, modifyEffect]);
  const gainStr = 'Gain:' + gain.current;

  return (
    <EffectPanelContainer>
      <EffectRangeContainer>
          <span>Attack:</span>
          <Tooltip title={attackStr}>
            <StyledSlider
              style={{ width: 162, height: 12, marginLeft: 12 }}
              onChange={attackHandler}
              min={0}
              max={1}
              defaultValue={0.3}
              step={0.01}
            />
          </Tooltip>
      </EffectRangeContainer>

      <EffectRangeContainer>
        <span>Release:</span>
        <Tooltip title={releaseStr}>
          <StyledSlider
            style={{ width: 162, height: 12, marginLeft: 12 }}
            onChange={releaseHandler}
            min={0}
            max={1}
            defaultValue={0.5}
            step={0.01}
          />
        </Tooltip>
      </EffectRangeContainer>

      <EffectRangeContainer>
        <span>Ratio:</span>
        <Tooltip title={ratioStr}>
          <StyledSlider
            style={{ width: 162, height: 12, marginLeft: 12 }}
            onChange={ratioHandler}
            min={1}
            max={20}
            defaultValue={10}
            step={0.1}
          />
        </Tooltip>
      </EffectRangeContainer>

      <EffectRangeContainer>
        <span>Threshold:</span>
        <Tooltip title={thresholdStr}>
          <StyledSlider
            style={{ width: 162, height: 12, marginLeft: 12 }}
            onChange={thresholdHandler}
            min={-100}
            max={0}
            defaultValue={-50}
            step={1}
          />
        </Tooltip>
      </EffectRangeContainer>

      <EffectRangeContainer>
        <span>Gain:</span>
        <Tooltip title={gainStr}>
          <StyledSlider
          style={{ width: 162, height: 12, marginLeft: 12 }}
          onChange={gainHandler}
          min={0}
          max={1}
          defaultValue={0.3}
          step={0.01}
        />
      </Tooltip>
      </EffectRangeContainer>
    </EffectPanelContainer>
  );
};

export default connector(CompressorPannel);
