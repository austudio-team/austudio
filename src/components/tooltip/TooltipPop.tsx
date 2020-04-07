import React, { CSSProperties } from 'react';
import { StyledTooltipPop } from '@components/styled/tooltip';
import ReactDOM from 'react-dom';
import { TooltipOverlay } from '@layout/base';

interface TooltipPopProps {
  show: boolean;
  title: string;
  style: CSSProperties;
}

const TooltipPop: React.FC<TooltipPopProps> = props => {
  const { show, title, style } = props;
  return !show ? null : ReactDOM.createPortal(<StyledTooltipPop style={style} show={show}>{title}</StyledTooltipPop>, TooltipOverlay!);
};

export default(TooltipPop);
