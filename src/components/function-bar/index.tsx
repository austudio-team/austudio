import React from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ButtonGroup, UndoButton, RedoButton, PointerButton, CutButton, FolderButton } from '@components/styled/functionBar';
import Tooltip from '@components/tooltip';
import { RootState } from '@redux/reducers';
import { toggleLibrary } from '@redux/actions/functionBar';
import { ConnectedProps, connect } from 'react-redux';
import { FunctionState } from '@redux/types/functionBar';
import { librarySelector } from '@redux/selectors/functionBar';

const mapState = (state: RootState) => ({
  libraryState: librarySelector(state.funtionBar),
});

const mapDispatch = {
  toggleLibrary,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const FunctionBar: React.FC<Props> = props => {
  const { libraryState, toggleLibrary } = props;
  return (
    <FunctionBarcontainer>
      <ButtonGroup>
        <Tooltip title="Undo"><UndoButton /></Tooltip>
        <Tooltip title="Redo"><RedoButton disable /></Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip title="Select"><PointerButton active /></Tooltip>
        <Tooltip title="Cut"><CutButton /></Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip title="Library">
          <FolderButton active={libraryState === FunctionState.ACTIVE} onClick={toggleLibrary} />
        </Tooltip>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default connector(FunctionBar);
