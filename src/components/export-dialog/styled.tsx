import styled, { keyframes, css } from "styled-components";
import { transparentize } from "polished";
import { theme } from "@constants";
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { ReactComponent as Rolling } from '@assets/svg/rolling.svg';

const inAnimationBottomRight = keyframes`
0% {
  opacity: 0%;
  transform: translate(-50%, -50%) scale(0);
}

60% {
  opacity: 90%;
  transform: translate(-50%, -50%) scale(1.1);
}

100% {
  opacity: 100%;
  transform: translate(-50%, -50%) scale(1);
}
`;

interface ExportDialogContainerProps {
  supportBackdropFilter?: boolean;
}

const backdropKeyframe = keyframes`
  from {
    background: ${transparentize(1, theme.colors.N800)};
    backdrop-filter: blur(0) brightness(100%);
  }
  to {
    background: ${transparentize(0.6, theme.colors.N800)};
    backdrop-filter: blur(6px) brightness(90%);
  }
`;

const fallbackKeyframe = keyframes`
  from {
    background: ${transparentize(1, theme.colors.N800)};
  }
  to {
    background: ${transparentize(0.2, theme.colors.N800)};
  }
`;

export const ExportDialogContainer = styled.div<ExportDialogContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  animation: ${p => p.supportBackdropFilter ? css`${backdropKeyframe}` : css`${fallbackKeyframe}`} 0.5s ease forwards;
`;

export const ExportPanelContainer = styled.div`
  position: absolute;
  z-index: 201;
  height: 300px;
  width: 480px;
  background: ${p => p.theme.colors.N600};
  color: ${p => p.theme.colors.N100};
  animation: ${inAnimationBottomRight} 0.3s ${p => p.theme.animation.normal} forwards;
  left: 50%;
  top: 50%;
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

export const CardContainer = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: repeat(auto-fill, 80px);
  place-items: center;
`;

interface FormatCardProps {
  selected?: boolean;
}

export const FormatTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

export const FormatSubTitle = styled.div`
  font-size: 14px;
`;

export const FormatCard = styled.div<FormatCardProps>`
  height: 60px;
  width: 120px;
  border-radius: 4px;
  border: 1px solid ${p => p.selected ? p.theme.colors.P300 : p.theme.colors.N500};
  background-color: ${p => p.selected ? p.theme.colors.P700 : 'transparent'};
  /* color: ${p => p.selected ? `transparent` : p.theme.colors.N200}; */
  color: ${p => p.theme.colors.N200};
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;

  :hover {
    border: 1px solid ${p => p.theme.colors.N100};
  }
`;

interface ExportDialogContainerProps {
  rendering?: boolean;
}

export const ExportButton = styled.div<ExportDialogContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.colors.N800};
  background-color: ${p => p.theme.colors.N200};
  margin-left: 50%;
  margin-top: 20px;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  cursor: ${p => p.rendering ? `not-allowed` : `default`};

  :hover {
    background-color: ${p => p.theme.colors.N100};
  }
`;

export const RollingIcon = styled(Rolling)`
  width: 18px;
  height: 18px;
  margin: 0 !important;
  margin-right: 6px !important;
`;
