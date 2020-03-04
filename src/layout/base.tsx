import React from 'react';
import { Container } from '../components/styled';
import MenuBar from '@components/menu-bar';
import FunctionBar from '@components/function-bar';
import ControlBar from '@components/control-bar';
import Editor from '@components/editor';
import Limiter from '@components/pannels/limiter'

const Layout: React.FC = () => {
  return (
    <Container>
      <Limiter></Limiter>
    </Container>
  );
}

export default Layout;
