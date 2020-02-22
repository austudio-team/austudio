import React from 'react';
import { Container, EditorContainer } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import { Dropdown } from '@components/dropdown';
import AudioChannel from '@components/audio-channel';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <Dropdown value="Effect" width={200} />
      <AudioChannel />
      <EditorContainer />
    </Container>
  );
}

export default Layout;
