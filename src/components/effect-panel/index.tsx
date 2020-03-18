import React, { useEffect, useState, useRef, useCallback } from 'react';
import { EffectPanelContainer, Title, CloseIcon, TitleWrapper, TemplateWrapper, ParamsContainer } from './styled';
import { Dropdown } from '@components/dropdown';
import Tooltip from '@components/tooltip';
import { StyledSlider } from '@components/styled/slider';
import { RootState } from '@redux/reducers';
import { librarySelector } from '@redux/selectors/functionBar';
import { toggleLibrary } from '@redux/actions/functionBar';
import { FunctionState } from '@redux/types/functionBar';
import { ConnectedProps, connect } from 'react-redux';
import {createPortal} from 'react-dom';

const mapState = (state: RootState) => ({
  libraryState: librarySelector(state.functionBar),
});
const mapDispatch = {
  toggleLibrary,
}
const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;
const EffectPanel: React.FC<Props> = props => {
  const EffectPanelRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const panelX = useRef<number>(50);
  const panelY = useRef<number>(100);

  const { libraryState, toggleLibrary } = props;
  const [inited, setInited] = useState<boolean>(false);
  

  useEffect(() => {
    if (!inited && libraryState === FunctionState.ACTIVE) {
      setInited(true);
    }
  }, [inited, libraryState]);

  const rerenderScroll = useCallback((moveX, moveY) => {
    const EffectPanel = EffectPanelRef.current;
    if (EffectPanel) {
      EffectPanel.style.left = `${moveX}px`;
      EffectPanel.style.top = `${moveY}px`;
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
  }, [setDragging])

  // mouseMoveEffect
  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        panelX.current += e.movementX;
        panelY.current += e.movementY;
        rerenderScroll(panelX.current, panelY.current);
      }
      window.addEventListener('mousemove', handler);
      return () => {
        window.removeEventListener('mousemove', handler);
      }
    }
  }, [dragging]);

  // mouseUpEffect
  useEffect(() => {
    if (dragging) {
      const handler = (e: MouseEvent) => {
        setDragging(false);
      }
      window.addEventListener('mouseup', handler);
      return () => {
        window.removeEventListener('mouseup', handler);
      }
    }
  }, [dragging, setDragging]);


  return inited ? createPortal((
    <EffectPanelContainer
      show={libraryState === FunctionState.ACTIVE}
      onMouseDown={handleMouseDown} ref={EffectPanelRef}
    >
      <TitleWrapper>
        <CloseIcon onClick={toggleLibrary} />
        <Title>AUDIO CHANNEL 2</Title>
      </TitleWrapper>
      <TemplateWrapper>
        <span>Reverb</span>
        <Dropdown value="Presets" width={150} margin="0 0 0 100px"></Dropdown>
      </TemplateWrapper>
      <ParamsContainer>
          <span>V:</span>
          <Tooltip title={'Size'}>
            <StyledSlider
              style={{ width: 162, marginLeft: 12 }}
              value={10}
              min={0}
              max={100}
              step={1}
            />
          </Tooltip>
        </ParamsContainer>
    </EffectPanelContainer>
  ), document.querySelector('#portalNode') as HTMLDivElement) : null;
}
export default connector(EffectPanel);