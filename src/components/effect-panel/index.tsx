import React, { useEffect, useState, useRef, useCallback } from 'react';
import { EffectPanelContainer, Title, CloseIcon, TitleWrapper, TemplateWrapper, ParamsContainer, SelectContainer } from './styled';
import { RootState } from '@redux/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { channelItemSelector } from '@redux/selectors/channel';
import { effectByIdSelector } from '@redux/selectors/audioEffect';
import { closeEffectPanel } from '@redux/actions/audioEffect';
import { effectName, Effects } from '@constants';
import eventEmitter from '@utils/event';
import { EffectPanelEvent } from '@events/effectPanel';
import CompressorPannel from '@components/effect-audio-node/compressor';
import DelayPannel from '@components/effect-audio-node/delay';
import FilterPannel from '@components/effect-audio-node/filter';
import EqualizerPannel from '@components/effect-audio-node/equalizer';
import ReverbPannel from '@components/effect-audio-node/reverb';
import TremoloPannel from '@components/effect-audio-node/tremolo';
import { StyledSelect } from '@components/styled/select';
import { Option } from 'rc-select';

interface EffectPanelProps {
  channelId: string;
  effectId: string;
}

const mapComponent = {
  [Effects.COMPRESSOR]: CompressorPannel,
  [Effects.DELAY]: DelayPannel,
  [Effects.FILTER]: FilterPannel,
  [Effects.EQUALIZER]: EqualizerPannel,
  [Effects.REVERB]: ReverbPannel,
  [Effects.TREMOLO]: TremoloPannel,
}

const mapState = (state: RootState, ownProps: EffectPanelProps) => ({
  channel: channelItemSelector(state.channel, ownProps.channelId),
  effect: effectByIdSelector(state.audioEffect, ownProps.channelId, ownProps.effectId),
});

const mapDispatch = {
  closeEffectPanel,
};

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector> & EffectPanelProps;

const EffectPanel: React.FC<Props> = props => {
  const EffectPanelRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const panelX = useRef<number>(0);
  const panelY = useRef<number>(0);
  const [inited, setInited] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const { channel, effect, effectId, channelId, closeEffectPanel } = props;

  const rerenderPos = useCallback(() => {
    const EffectPanel = EffectPanelRef.current;
    if (EffectPanel) {
      EffectPanel.style.left = `${panelX.current}px`;
      EffectPanel.style.top = `${panelY.current}px`;
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    eventEmitter.emit(EffectPanelEvent.PANEL_SELECTED, effectId);
    setDragging(true);
  }, [setDragging, effectId])

  // mouseMoveEffect
  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        panelX.current += e.movementX;
        panelY.current += e.movementY;
        rerenderPos();
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging, rerenderPos]);

  // mouseUpEffect
  useEffect(() => {
    if (dragging) {
      const handler = () => {
        setDragging(false);
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging]);

  const handleClosePanel = useCallback(() => {
    closeEffectPanel(channelId, effectId);
  }, [closeEffectPanel, effectId, channelId]);

  // initPosEffect
  useEffect(() => {
    if (EffectPanelRef.current) {
      const panel = EffectPanelRef.current;
      const { height, width } = panel.getBoundingClientRect();
      const { clientHeight, clientWidth } = document.body;
      panelX.current = Math.round((clientWidth - width) / 2);
      panelY.current = Math.round((clientHeight - height) / 2);
      rerenderPos();
      setInited(true);
    }
  }, [effectId, rerenderPos]);

  useEffect(() => {
    const handler = (targetEffectId: string) => {
      if (effectId !== targetEffectId) {
        setSelected(false);
      } else {
        setSelected(true);
      }
    }
    eventEmitter.on(EffectPanelEvent.PANEL_SELECTED, handler);
    eventEmitter.emit(EffectPanelEvent.PANEL_SELECTED, effectId);
    return () => {
      eventEmitter.off(EffectPanelEvent.PANEL_SELECTED, handler);
    }
  }, [setSelected, effectId])

  let EffectComponent = mapComponent[effect.type];

  return (
    <EffectPanelContainer
      onMouseDown={handleMouseDown}
      ref={EffectPanelRef}
      inited={inited}
      selected={selected}
    >
      <TitleWrapper>
        <CloseIcon onClick={handleClosePanel} />
        <Title>{channel.name}</Title>
      </TitleWrapper>
      <TemplateWrapper>
        <span>{effectName[effect.type]}</span>
        <SelectContainer>
          <StyledSelect defaultValue='Present'>
            <Option value='Prensent'>Present</Option>
          </StyledSelect>
        </SelectContainer>
      </TemplateWrapper>
      <ParamsContainer>
        <EffectComponent channelId={channelId} effect={effect}></EffectComponent>
      </ParamsContainer>
    </EffectPanelContainer>
  );
}
export default connector(EffectPanel);