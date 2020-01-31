import React from 'react';
import { Container, FunctionBarcontainer, EditorContainer } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <FunctionBarcontainer />
      <EditorContainer />
    </Container>
  );
}

export default Layout;
