import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";
import { theme } from "@constants/theme";

const blink = keyframes`
  0% {
    background-color: ${theme.colors.R500};
  }
  50% {
    background-color: ${theme.colors.R300};
  }
  100% {
    background-color: ${theme.colors.R500};
  }
`;

export const StyledRecoringBlock = styled.div`
  position: absolute;
  height: 122px;
  top: 0;
  animation: ${blink} 5s ease-in-out infinite;
  color: ${p => p.theme.colors.N100};
  z-index: 99;
  display: none;

  &::before {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    border: 1px solid ${p => transparentize(0.5, p.theme.colors.N800)};
    pointer-events: none;
  }
`;

export const AudioName = styled.div`
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  padding-left: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${p => transparentize(0.8, p.theme.colors.N800)};
`;
