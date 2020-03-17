import React from 'react';
import { Container } from '../components/styled';
// import MenuBar from '@components/menu-bar';
// import FunctionBar from '@components/function-bar';
// import ControlBar from '@components/control-bar';
// import Editor from '@components/editor';
// import Filter from '@components/pannels/filter'
// import Reverb from '@components/pannels/reverb'
// import Delay from '@components/pannels/delay'
// import Equalizer from '@components/pannels/equalizer'
// import Compressor from '@components/pannels/compressor'
import Tremolo from '@components/pannels/tremolo'

const Layout: React.FC = () => {
  return (
    <Container>
      <Tremolo></Tremolo>
    </Container>
  );
}

export default Layout;
