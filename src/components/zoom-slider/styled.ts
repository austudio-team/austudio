import styled from "styled-components";
import { scrollerSize } from "@components/editor/constants";

export const ZoomWrapper = styled.div`
  display: block;
  position: absolute;
  height: ${scrollerSize}px;
  width: 120px;
  padding: 0 8px;
  bottom: 0;
  right: ${scrollerSize}px;
  background-color: ${p => p.theme.colors.N800};
`;

