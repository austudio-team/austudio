import React from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ButtonGroup, UndoButton, RedoButton, PointerButton, CutButton, FolderButton } from '@components/styled/functionBar';
import Tooltip from '@components/tooltip';

const FunctionBar: React.FC = () => {
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
        <Tooltip title="Library"><FolderButton /></Tooltip>
      </ButtonGroup>
    </FunctionBarcontainer>
  );
};

export default FunctionBar;
