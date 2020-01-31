import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { ReactComponent as Undo } from '@assets/svg/undo.svg';
import { ReactComponent as Redo } from '@assets/svg/redo.svg';
import { ReactComponent as Pointer } from '@assets/svg/pointer.svg';
import { ReactComponent as Cut } from '@assets/svg/cut.svg';

export const ButtonGroup = styled.div`
  display: flex;
  border-right: 1px solid ${props => props.theme.colors.N800};
  &:last-child {
    border-right: none;
  }
`;

interface ButtonProps {
  active?: boolean;
  disable?: boolean;
}

const getNormalColor = (props: ThemedStyledProps<ButtonProps, DefaultTheme>) => {
  const { disable, active, theme: { colors } } = props;
  if (disable) {
    return active ? colors.P500 : colors.N500;
  }
  if (active) {
    return colors.P300;
  }
  return colors.N300;
}

const getHoverColor = (props: ThemedStyledProps<ButtonProps, DefaultTheme>) => {
  const { disable, active, theme: { colors } } = props;
  if (disable) {
    return active ? colors.P500 : colors.N500;
  }
  if (active) {
    return colors.P100;
  }
  return colors.N100;
}

const getStyledButton = (component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) => {
  return styled(component)<ButtonProps>`
    height: 42px;
    width: 42px;
    padding: 10px;
    box-sizing: border-box;

    & path {
      fill: ${props => getNormalColor(props)};
    }

    &:hover path {
      fill: ${props => getHoverColor(props)};
    }
  `;
}

export const UndoButton = getStyledButton(Undo);
export const RedoButton = getStyledButton(Redo);
export const PointerButton = getStyledButton(Pointer);
export const CutButton = getStyledButton(Cut);
