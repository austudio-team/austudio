import React, { useEffect, useState } from 'react';
import { RootState } from '@redux/reducers';
import { toggleLibrary } from '@redux/actions/functionBar';
import { ConnectedProps, connect } from 'react-redux';
import { FunctionState } from '@redux/types/functionBar';
import { librarySelector } from '@redux/selectors/functionBar';
import { AudioManageContainer, CloseIcon, Title } from './styled';

const mapState = (state: RootState) => ({
  libraryState: librarySelector(state.funtionBar),
});

const mapDispatch = {
  toggleLibrary,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const AudioManage: React.FC<Props> = props => {
  const { libraryState, toggleLibrary } = props;
  const [inited, setInited] = useState<boolean>(false);
  useEffect(() => {
    if (!inited && libraryState === FunctionState.ACTIVE) {
      setInited(true);
    }
  }, [inited, libraryState]);
  return inited ? (
    <AudioManageContainer
      show={libraryState === FunctionState.ACTIVE}
    >
      <Title>LIBRARY</Title>
      <CloseIcon onClick={toggleLibrary} />
    </AudioManageContainer>
  ) : null;
};

export default connector(AudioManage);
