import styled from 'styled-components';

export const AudioChannelWrapper = styled.div`
  margin-top: 18px;
`;

export const TrackWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 18px;
`;

export const TrackIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: ${props => props.theme.colors.P300};
  cursor: move;

  &::before {
    content: ' ';
    position: absolute;
    left: -8px;
    top: -14px;
    transform: translateX(0.5px);
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top: 16px solid ${props => props.theme.colors.P300};
    cursor: move;
  }
`;
