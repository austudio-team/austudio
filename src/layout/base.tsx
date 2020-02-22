import React from 'react';
import { Container, EditorContainer } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import AudioChannel from '@components/audio-channel';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <AudioChannel />
      <EditorContainer />
    </Container>
  );
}

export default Layout;
