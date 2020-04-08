import styled, { keyframes } from "styled-components";
import { transparentize } from 'polished';
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { ReactComponent as Empty } from '@assets/svg/empty.svg';
import { ReactComponent as Loading } from '@assets/svg/loading.svg';

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
  supportBackdropFilter?: boolean;
}

export const AudioManageContainer = styled.div<AudioManageContainerProps>`
  position: absolute;
  z-index: 999;
  right: 0;
  top: 0;
  width: 360px;
  height: 100%;
  background: ${props => props.supportBackdropFilter ? transparentize(0.4, props.theme.colors.N800) : transparentize(0.1, props.theme.colors.N800)};
  backdrop-filter: blur(10px) brightness(60%);
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

export const AudioItemWrapper = styled.div`
  
`;

export const StyledAudioItem = styled.div`
  position: relative;
  display: flex;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  &:hover {
    background-color: ${p => p.theme.colors.N600};
  }
`;

export const AudioIconWrapper = styled.div`
  height: 42px;
  width: 42px;
  background-color: ${p => p.theme.colors.N800};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  svg {
    width: 36px;
    height: 36px;
  }
`;

export const AudioInfoWrapper = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const AudioInfoFileName = styled.div`
  font-size: 14px;
  color: ${p => p.theme.colors.N200};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AudioInfoFileLength = styled(AudioInfoFileName)`
  margin-top: 2px;
  font-size: 12px;
  color: ${p => p.theme.colors.N300};
`;

export const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const EmptyIcon = styled(Empty)`
  width: 64px;
  height: 64px;
  path {
    fill: ${p => p.theme.colors.N300};
  }
`;

export const EmptyTip = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.N300};
`;

export const EmptyTitle = styled(EmptyTip)`
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.theme.colors.N200};
  margin: 8px 0;
`;

export const DeleteIcon = styled(Close)`
  height: 16px;
  width: 16px;
  cursor: pointer;
  flex-shrink: 0;
  path {
    fill: ${p => p.theme.colors.N400};
  }

  &:hover {
    path {
      fill: ${p => p.theme.colors.N300};
    } 
  }
`;

export const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${p => transparentize(0.6, p.theme.colors.N800)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingIcon = styled(Loading)`
  height: 52px;
`;
