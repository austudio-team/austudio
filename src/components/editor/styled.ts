import styled from 'styled-components';
import { editorChannelWidth, editorMarginTop } from './constants';


export const AudioChannelWrapper = styled.div`
  margin-top: ${editorMarginTop}px;
  width: ${editorChannelWidth}px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;

export const AudioChannelScroller = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const TrackWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${editorMarginTop}px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;

export const TrackScroller = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const TrackIndicator = styled.div`
  position: absolute;
  top: ${editorMarginTop}px;
  left: ${editorChannelWidth}px;
  width: 1px;
  height: 100%;
  background-color: ${props => props.theme.colors.P500};
  cursor: move;
  z-index: 101;

  &::before {
    content: ' ';
    position: absolute;
    left: -8px;
    top: -14px;
    transform: translateX(0.5px);
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top: 16px solid ${props => props.theme.colors.P500};
    cursor: move;
  }
`;
