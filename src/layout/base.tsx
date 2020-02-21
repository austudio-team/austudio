import React from 'react';
import { Container, EditorContainer } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import { Dropdown } from '@components/dropdown';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <Dropdown value="Effect" width={200} />
      <EditorContainer />
    </Container>
  );
}

export default Layout;
