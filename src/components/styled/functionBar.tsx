import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { ReactComponent as Undo } from '@assets/svg/undo.svg';
import { ReactComponent as Redo } from '@assets/svg/redo.svg';
import { ReactComponent as Pointer } from '@assets/svg/pointer.svg';
import { ReactComponent as Cut } from '@assets/svg/cut.svg';
import { ReactComponent as Folder } from '@assets/svg/folder.svg';
import { ReactComponent as Play } from '@assets/svg/play.svg';
import { ReactComponent as Pause } from '@assets/svg/pause.svg';
import { ReactComponent as Stop } from '@assets/svg/stop.svg';
import { ReactComponent as Record } from '@assets/svg/record.svg';
import { theme } from '@constants';

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.N800};
  padding: 0 6px;
  &:last-child {
    border-right: none;
  }
`;

interface DetailColor {
  active: string,
  disable: string,
  normal: string,
  disableAndActive: string,
}

export interface ColorMap {
  normal: DetailColor,
  hover: DetailColor,
}

const normalColorMap: ColorMap = {
  normal: {
    active: theme.colors.P300,
    disable: theme.colors.N500,
    normal: theme.colors.N300,
    disableAndActive: theme.colors.P500,
  },
  hover: {
    active: theme.colors.P100,
    normal: theme.colors.N100,
    disable: theme.colors.P500,
    disableAndActive: theme.colors.P500,
  }
};

const redColorMap: ColorMap = {
  normal: {
    active: theme.colors.P300,
    disable: theme.colors.R500,
    normal: theme.colors.R300,
    disableAndActive: theme.colors.P500,
  },
  hover: {
    active: theme.colors.P100,
    normal: theme.colors.R100,
    disable: theme.colors.R500,
    disableAndActive: theme.colors.P500,
  }
}

interface ButtonProps {
  active?: boolean;
  disable?: boolean;
}

export const getNormalColor = (props: ThemedStyledProps<ButtonProps, DefaultTheme>, colorMap: ColorMap = normalColorMap) => {
  const { disable, active } = props;
  if (disable) {
    return active ? colorMap.normal.disableAndActive : colorMap.normal.disable;
  }
  if (active) {
    return colorMap.normal.active;
  }
  return colorMap.normal.normal;
}

export const getHoverColor = (props: ThemedStyledProps<ButtonProps, DefaultTheme>, colorMap: ColorMap = normalColorMap) => {
  const { disable, active } = props;
  if (disable) {
    return active ? colorMap.hover.disableAndActive : colorMap.hover.disable;
  }
  if (active) {
    return colorMap.hover.active;
  }
  return colorMap.hover.normal;
}

const getStyledButton = (component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>, colorMap: ColorMap = normalColorMap) => {
  return styled(component)<ButtonProps>`
    height: 42px;
    width: 42px;
    padding: 10px;

    & path {
      fill: ${props => getNormalColor(props, colorMap)};
    }

    &:hover path {
      fill: ${props => getHoverColor(props, colorMap)};
    }
  `;
}

const getBorderedButton = (component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>, colorMap: ColorMap = normalColorMap) => {
  return styled(component)<ButtonProps>`
    height: 32px;
    width: 52px;
    padding: 6px 10px;
    margin-left: 6px;
    background-color: ${props => props.theme.colors.N800};

    & path {
      fill: ${props => getNormalColor(props, colorMap)};
    }

    &:hover path {
      fill: ${props => getHoverColor(props, colorMap)};
    }
  `;
}

export const UndoButton = getStyledButton(Undo);
export const RedoButton = getStyledButton(Redo);
export const PointerButton = getStyledButton(Pointer);
export const CutButton = getStyledButton(Cut);
export const FolderButton = getStyledButton(Folder);
export const PlayButton = getBorderedButton(Play);
export const PauseButton = getBorderedButton(Pause);
export const StopButton = getBorderedButton(Stop);
export const RecordButton = getBorderedButton(Record, redColorMap);

