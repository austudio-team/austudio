import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AboutPanelContainer, Title, CloseIcon, TitleWrapper, StyledMusicIcon, LogoArea, StyledAppName, StyledAuthorName, StyledLicense } from './styled';
import { RootState } from '@redux/reducers';
import { ConnectedProps, connect } from 'react-redux'; 
import { toggleAboutPanel } from '@redux/actions/menu';
import { aboutPanelOpenedSelector } from '@redux/selectors/menu';
import { license } from '@constants/mitLicense';

const mapState = (state: RootState) => ({
  aboutOpened: aboutPanelOpenedSelector(state.menu),
});

const mapDispatch = {
  toggleAboutPanel,
};

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

const AboutPanel: React.FC<Props> = props => {
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const panelX = useRef<number>(0);
  const panelY = useRef<number>(0);
  const [inited, setInited] = useState<boolean>(false);
  
  const { toggleAboutPanel, aboutOpened } = props;

  const rerenderPos = useCallback(() => {
    const EffectPanel = aboutPanelRef.current;
    if (EffectPanel) {
      EffectPanel.style.left = `${panelX.current}px`;
      EffectPanel.style.top = `${panelY.current}px`;
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
    toggleAboutPanel();
  }, [toggleAboutPanel]);

  // initPosEffect
  useEffect(() => {
    if (aboutPanelRef.current) {
      const panel = aboutPanelRef.current;
      const { height, width } = panel.getBoundingClientRect();
      const { clientHeight, clientWidth } = document.body;
      panelX.current = Math.round((clientWidth - width) / 2);
      panelY.current = Math.round((clientHeight - height) / 2);
      rerenderPos();
      setInited(true);
    }
  }, [rerenderPos, aboutOpened]);

  return !aboutOpened ? null : (
    <AboutPanelContainer
      onMouseDown={handleMouseDown}
      ref={aboutPanelRef}
      inited={inited}
    >
      <TitleWrapper>
        <CloseIcon onClick={handleClosePanel} />
        <Title>About</Title>
      </TitleWrapper>
      <LogoArea>
        <StyledMusicIcon />
        <StyledAppName>AuStudio</StyledAppName>
        <StyledAuthorName>Build by <a rel="noopener noreferrer" target="_blank" href="https://github.com/delbertbeta/">Delbert</a> {'&'} <a target="_blank" rel="noopener noreferrer" href="https://github.com/shyrii/">Shyrii</a>.</StyledAuthorName>
        <StyledAuthorName>View it on <a rel="noopener noreferrer" href="https://github.com/austudio-team/austudio" target="_blank">Github</a>.</StyledAuthorName>
      </LogoArea>
      <StyledLicense>
        {license}
      </StyledLicense>
    </AboutPanelContainer>
  );
}

export default connector(AboutPanel);
