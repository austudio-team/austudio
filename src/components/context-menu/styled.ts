import styled, { keyframes, css } from "styled-components";
import { transparentize } from 'polished';
import { theme } from "@constants/theme";

export const inAnimationBottomRight = keyframes`
  0% {
    opacity: 0%;
    transform: scale(0);
  }

  60% {
    opacity: 90%;
    transform: scale(1.1);
  }

  100% {
    opacity: 100%;
    transform: scale(1);
  }
`;

export const inAnimationBottomLeft = keyframes`
  0% {
    opacity: 0%;
    transform: translateX(-100%) scale(0);
  }

  60% {
    opacity: 90%;
    transform: translateX(-100%) scale(1.1);
  }

  100% {
    opacity: 100%;
    transform: translateX(-100%) scale(1);
  }
`;


export const inAnimationTopLeft = keyframes`
  0% {
    opacity: 0%;
    transform: translate(-100%, 100%) scale(0);
  }

  60% {
    opacity: 90%;
    transform: translate(-100%, 100%) scale(1.1);
  }

  100% {
    opacity: 100%;
    transform: translate(-100%, 100%) scale(1);
  }
`;

export const inAnimationTopRight = keyframes`
  0% {
    opacity: 0%;
    transform: translateY(-100%) scale(0);
  }

  60% {
    opacity: 90%;
    transform: translateY(-100%) scale(1.1);
  }

  100% {
    opacity: 100%;
    transform: translateY(-100%) scale(1);
  }
`;

export type ContextMenuWrapperPos = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
interface ContextMenuWrapperProps {
  pos: ContextMenuWrapperPos;
}

export const ContextMenuWrapper = styled.div<ContextMenuWrapperProps>`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 4px 0;
  min-width: 200px;
  z-index: 999;
  background-color: ${theme.colors.N700};
  border: 1px solid ${theme.colors.N500};
  transform-origin: ${
    p => p.pos === 'topLeft' ? '100% 100%' : (
      p.pos === 'topRight' ? '0 100%' : (
        p.pos === 'bottomLeft' ? '100% 0' : '0 0'
      )
    )
  };
  box-shadow: 2px 2px 8px ${transparentize(0.6, theme.colors.N800)};
  animation: ${p => p.pos === 'topLeft' ? css`${inAnimationTopLeft}` : (
      p.pos === 'topRight' ? css`${inAnimationTopRight}` : (
        p.pos === 'bottomLeft' ? css`${inAnimationBottomLeft}` : css`${inAnimationBottomRight}`
      )
    )} 0.3s ease-in-out both;
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
