import React, { useCallback, useEffect } from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ButtonGroup, UndoButton, RedoButton, PointerButton, CutButton, FolderButton, ResizeButton } from '@components/styled/functionBar';
import Tooltip from '@components/tooltip';
import { RootState } from '@redux/reducers';
import { toggleLibrary, toggleCursorType } from '@redux/actions/functionBar';
import { ConnectedProps, connect } from 'react-redux';
import { FunctionState, FunctionBarCursorType } from '@redux/types/functionBar';
import { librarySelector, cursorTypeSelector } from '@redux/selectors/functionBar';
import { KeyEventEmitter } from '@utils/keyevent';
import { KeyEvent } from '@utils/keyevent_declare';

const mapState = (state: RootState) => ({
  libraryState: librarySelector(state.functionBar),
  cursorType: cursorTypeSelector(state.functionBar),
});

const mapDispatch = {
  toggleLibrary,
  toggleCursorType,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const FunctionBar: React.FC<Props> = props => {
  const { libraryState, toggleLibrary, cursorType, toggleCursorType } = props;
  const cursorTypeClickHandler = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const type = e.currentTarget.dataset['type'] as FunctionBarCursorType;
    toggleCursorType(type);
  }, [toggleCursorType]);

  useEffect(() => {
    KeyEventEmitter.on(KeyEvent.Select, () => { toggleCursorType(FunctionBarCursorType.select) });
    KeyEventEmitter.on(KeyEvent.Stretch, () => { toggleCursorType(FunctionBarCursorType.stretch) });
    KeyEventEmitter.on(KeyEvent.Cut, () => { toggleCursorType(FunctionBarCursorType.cut) });
    KeyEventEmitter.on(KeyEvent.ToggleLibrary, () => { toggleLibrary() });
  }, [toggleCursorType, toggleLibrary]);

  return (
    <FunctionBarcontainer>
      <ButtonGroup>
        <Tooltip title="Undo"><UndoButton /></Tooltip>
        <Tooltip title="Redo"><RedoButton disable /></Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip title="Select">
          <PointerButton
            active={cursorType === FunctionBarCursorType.select}
            data-type={FunctionBarCursorType.select}
            onClick={cursorTypeClickHandler}
          />
        </Tooltip>
        <Tooltip title="Cut">
          <CutButton
            active={cursorType === FunctionBarCursorType.cut}
            data-type={FunctionBarCursorType.cut}
            onClick={cursorTypeClickHandler}
          />
        </Tooltip>
        <Tooltip title="Stretch">
          <ResizeButton
            active={cursorType === FunctionBarCursorType.stretch}
            data-type={FunctionBarCursorType.stretch}
            onClick={cursorTypeClickHandler}
          />
        </Tooltip>
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
