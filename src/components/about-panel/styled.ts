import styled, { css } from 'styled-components';
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { inAnimationBottomRight } from '@components/context-menu/styled';
import { ReactComponent as MusicIcon } from '@assets/svg/music.svg';

interface AboutPanelContainerProps {
  inited: boolean;
}

export const AboutPanelContainer = styled.div<AboutPanelContainerProps>`
  position: fixed;
  z-index: 201;
  width: 360px;
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

export const LogoArea = styled.div`
  width: 100%;
  padding: 0 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledMusicIcon = styled(MusicIcon)`
  width: 100px;
  height: 100px;
  margin-top: 24px;

  path {
    fill: ${p => p.theme.colors.P500};
  }
`;

export const StyledAppName = styled.div`
  color: ${p => p.theme.colors.N300};
  font-size: 18px;
  margin-top: 16px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const StyledAuthorName = styled.div`
  color: ${p => p.theme.colors.N400};
  font-size: 12px;
  margin-top: 4px;

  a {
    color: inherit;
    outline: 0;
  }
`;

export const StyledLicense = styled.div`
  outline: none;
  margin: 16px 16px 16px;
  padding: 4px;
  height: 100px;
  font-size: 12px;
  overflow-y: auto;
  background: ${p => p.theme.colors.N700};
  color: ${p => p.theme.colors.N400};
  white-space: pre-wrap;
`;
