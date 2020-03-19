import styled, { keyframes } from "styled-components";
import { transparentize } from 'polished';
import { theme } from "@constants/theme";

const inAnimation = keyframes`
  0% {
    opacity: 0%;
    transform: scale(0);
  }

  50% {
    opacity: 90%;
    transform: scale(1.1);
  }

  80% {
    opacity: 100%;
    transform: scale(1);
  }
`;

export const ContextMenuWrapper = styled.div`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 4px 0;
  min-width: 200px;
  z-index: 999;
  background-color: ${theme.colors.N700};
  border: 1px solid ${theme.colors.N500};
  transform-origin: 0 0;
  box-shadow: 2px 2px 8px ${transparentize(0.6, theme.colors.N800)};
  animation: ${inAnimation} 0.3s ease-in-out;
`;

export const ContextMenuItemWrapper = styled.div`
  height: 24px;
  line-height: 24px;
  width: 100%;
  padding: 0 12px;
  color: ${theme.colors.N300};
  font-size: 12px;

  &:hover {
    background-color: ${theme.colors.N500};
  }
`;

export const ContextMenuDivider = styled.div`
  margin: 4px 0;
  height: 1px;
  border-top: 1px solid ${theme.colors.N500};
  width: 100%;
`;
