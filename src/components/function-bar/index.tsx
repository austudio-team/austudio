import React from 'react';
import { FunctionBarcontainer } from '@components/styled';
import { ButtonGroup, UndoButton, RedoButton, PointerButton, CutButton } from '@components/styled/functionBar';
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
    </FunctionBarcontainer>
  );
};

export default FunctionBar;
