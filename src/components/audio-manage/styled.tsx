import styled, { keyframes } from "styled-components";
import { transparentize } from 'polished';
import { ReactComponent as Close } from '@assets/svg/close.svg';

const inKeyframe = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`; 

const outKeyframe = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`; 

interface AudioManageContainerProps {
  show?: boolean;
}

export const AudioManageContainer = styled.div<AudioManageContainerProps>`
  position: absolute;
  z-index: 999;
  right: 0;
  top: 0;
  width: 360px;
  height: 100%;
  background: ${props => transparentize(0.9, props.theme.colors.N800)};
  backdrop-filter: blur(10px);
  animation: ${props => props.show ? inKeyframe : outKeyframe} 0.3s ${props => props.theme.animation.normal} forwards;
  color: ${p => p.theme.colors.N100};
  font-size: 13px;
  box-shadow: 0px 0px 16px ${p => p.theme.colors.N800};
`;

export const CloseIcon = styled(Close)`
  & path {
    fill: ${p => p.theme.colors.N200};
    
  }
  &:hover {
    & path {
      fill: ${p => p.theme.colors.N100};
    }
  }
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;
  height: 24px;
  width: 24px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 54px;
  padding-left: 16px;
`;
