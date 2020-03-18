import styled, { keyframes } from 'styled-components';
import { ReactComponent as Close } from '@assets/svg/close.svg';

interface EffectPanelContainerProps {
  show?: boolean;
}

const inKeyframe = keyframes`
  from {
    transform: translateX(-100%);
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
    transform: translateX(-100%);
  }
`; 

export const EffectPanelContainer = styled.div<EffectPanelContainerProps>`
  position: absolute;
  z-index: 999;
  left: 50px;
  top: 100px;
  width: 360px;
  height: 240px;
  background: ${p => p.theme.colors.N600};
  color: ${p => p.theme.colors.N100};
  animation: ${props => props.show ? inKeyframe : outKeyframe} 0.3s ${props => props.theme.animation.normal} forwards;
  font-size: 13px;
  box-shadow: 0px 0px 16px ${p => p.theme.colors.N800};
  /* &:hover {
    background-color: ${p => p.theme.colors.N450};
  } */
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
  left: 10px;
  height: 12px;
  width: 12px;
`;

export const Title = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
  color: ${p => p.theme.colors.N400};
  margin: 0 auto;
`;

export const TitleWrapper = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${p => p.theme.colors.N800};
`;

export const TemplateWrapper = styled.div`
  height: 46px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`
export const ParamsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 15px;
  padding: 0 20px;
`
