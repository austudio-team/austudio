import React from 'react';
import { Container } from '../components/styled';
// import MenuBar from '@components/menu-bar';
// import FunctionBar from '@components/function-bar';
// import ControlBar from '@components/control-bar';
// import Editor from '@components/editor';
import Filter from '@components/pannels/filter'

const Layout: React.FC = () => {
  return (
    <Container>
      <Filter></Filter>
    </Container>
  );
}

export default Layout;
