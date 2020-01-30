import React from 'react';
import { Container, FunctionBarcontainer, EditorContainer } from '../components/styled';
import MenuBar from '@components/menu-bar';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBarcontainer />
      <FunctionBarcontainer />
      <EditorContainer />
    </Container>
  );
}

export default Layout;
