import styled from "styled-components";
import { scrollerSize, zoomSlideSize, editorChannelWidth } from "@components/editor/constants";

export const ScrollerWrapper = styled.div`
  display: block;
  position: absolute;
  height: ${scrollerSize}px;
  right: ${zoomSlideSize + scrollerSize}px;
  left: ${editorChannelWidth}px;
  bottom: 0;
  background-color: ${p => p.theme.colors.N800};
  z-index: 102;

  ::before {
    content: ' ';
    display: block;
    position: absolute;
    left: -${editorChannelWidth}px;
    top: 0;
    width: ${editorChannelWidth}px;
    height: ${scrollerSize}px;
    background-color: ${p => p.theme.colors.N800};
  }
`;

export const ScrollerBar = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: ${p => p.theme.colors.N500};
  position: absolute;
  top: 3px;

  &:hover {
    background-color: ${p => p.theme.colors.N450};
  }
`;
