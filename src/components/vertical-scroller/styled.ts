import styled from "styled-components";
import { editorMarginTop } from "@components/editor/constants";

export const ScrollerWrapper = styled.div`
  display: block;
  position: absolute;
  width: 14px;
  right: 0;
  top: ${editorMarginTop}px;
  bottom: 0;
  background-color: ${p => p.theme.colors.N800};
`;

export const ScrollerBar = styled.div`
  width: 8px;
  border-radius: 4px;
  background-color: ${p => p.theme.colors.N500};
  position: absolute;
  left: 3px;

  &:hover {
    background-color: ${p => p.theme.colors.N450};
  }
`;
