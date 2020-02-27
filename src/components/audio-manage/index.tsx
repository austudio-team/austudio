import React, { useEffect, useState } from 'react';
import { RootState } from '@redux/reducers';
import { toggleLibrary } from '@redux/actions/functionBar';
import { ConnectedProps, connect } from 'react-redux';
import { FunctionState } from '@redux/types/functionBar';
import { librarySelector } from '@redux/selectors/functionBar';
import { AudioManageContainer, CloseIcon, Title, AudioItemWrapper } from './styled';
import { audioListSelector, audioMapSelector } from '@redux/selectors/library';
import AudioItem from './AudioItem';

const mapState = (state: RootState) => ({
  libraryState: librarySelector(state.funtionBar),
  audioList: audioListSelector(state.library),
  audioInfo: audioMapSelector(state.library),
});

const mapDispatch = {
  toggleLibrary,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const AudioManage: React.FC<Props> = props => {
  const { libraryState, toggleLibrary, audioInfo, audioList } = props;
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
      <AudioItemWrapper>
        {
          audioList.map(v => (
            <AudioItem audioInfo={audioInfo[v]} key={v} />
          ))
        }
      </AudioItemWrapper>
    </AudioManageContainer>
  ) : null;
};

export default connector(AudioManage);
