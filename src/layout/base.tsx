import React from 'react';
import { Container } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import Editor from '@components/editor';
import EffectPanelContainer from '@components/effect-panel-container';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <Editor />
      <EffectPanelContainer />
    </Container>
  );
}

export default Layout;
