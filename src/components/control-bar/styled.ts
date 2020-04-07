import styled from 'styled-components';
import { inAnimationBottomRight } from '@components/context-menu/styled';
import { ReactComponent as MicOff } from '@assets/svg/mic_off.svg';
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { ReactComponent as Loading } from '@assets/svg/loading.svg';

export const Time = styled.div`
  height: 42px;
  line-height: 42px;
  font-size: 22px;
  font-family: monospace;
  text-align: center;
  width: 200px;
  color: ${props => props.theme.colors.N300};
`;

export const Tips = styled.div`
  position: absolute;
  top: 118px;
  left: 248px;
  height: 140px;
  width: 200px;
  padding: 0 12px;
  transform-origin: 50% 0;
  animation: ${inAnimationBottomRight} 0.5s ease;
  background: ${p => p.theme.colors.N600};
  box-shadow: 0px 0px 16px ${p => p.theme.colors.N800};
  border-radius: 4px;
  color: ${p => p.theme.colors.N300};
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  ::after {
    content: ' ';
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom: ${p => p.theme.colors.N600} solid 8px;
  }
`;

export const MicOffIcon = styled(MicOff)`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  path {
    fill: ${p => p.theme.colors.N300};
  }
`;

export const LoadingIcon = styled(Loading)`
  width: 48px;
  height: 48px;
  margin: 0 !important;
  margin-bottom: 16px !important;
  path {
    stroke: ${p => p.theme.colors.N300};
  }
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  cursor: pointer;
  path {
    fill: ${p => p.theme.colors.N300};
  }
  :hover {
    path {
      fill: ${p => p.theme.colors.N200};
    }
  }
`;
