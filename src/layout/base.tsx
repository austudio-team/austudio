import React from 'react';
import { Container, Overlay } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import Editor from '@components/editor';
import AboutPanel from '@components/about-panel';
import EffectPanelContainer from '@components/effect-panel-container';
import ExportDialog from '@components/export-dialog';

export let TooltipOverlay: HTMLDivElement | null = null;
export const tooltipOverlayRef = (ins: HTMLDivElement) => TooltipOverlay = ins;

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <Editor />
      <EffectPanelContainer />
      <AboutPanel />
      <Overlay ref={tooltipOverlayRef} />
      <ExportDialog />
    </Container>
  );
}

export default Layout;
