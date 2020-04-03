import styled, { css } from 'styled-components';
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { inAnimationBottomRight } from '@components/context-menu/styled';

interface EffectPanelContainerProps {
  inited: boolean;
  selected: boolean;
}

export const EffectPanelContainer = styled.div<EffectPanelContainerProps>`
  position: absolute;
  z-index: ${p => p.selected ? 201 : 200};
  width: 280px;
  background: ${p => p.theme.colors.N600};
  color: ${p => p.theme.colors.N100};
  opacity: ${p => p.inited ? 1 : 0};
  animation: ${p => p.inited ? css`${inAnimationBottomRight} 0.3s ${p.theme.animation.normal} backwards` : 'none'};
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
  font-size: 18px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`
export const ParamsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${p => p.theme.colors.N200};
`
export const SelectContainer = styled.div`
  position: absolute;
  right: 20px;
`