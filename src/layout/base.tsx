import React from 'react';
import { Container } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import Editor from '@components/editor';
// import PortalNode from '@components/portal-node';

const Layout: React.FC = () => {
  return (
    <Container>
      <MenuBar />
      <FunctionBar />
      <ControlBar />
      <Editor />
      <div style={{ position: 'absolute' }} id="portalNode"></div>
    </Container>
  );
}

export default Layout;
