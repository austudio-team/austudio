import styled from 'styled-components';

export const TooltipPop = styled.div<{ show?: boolean }>`
  display: ${props => props.show ? 'block' : 'none' };
  position: absolute;
  top: 100%;
  left: 0;
  line-height: 22px;
  height: 22px;
  padding: 0 12px;
  font-size: 14px;
  color: ${props => props.theme.colors.N300};
  background-color: ${props => props.theme.colors.N700};
  border: 1px solid ${props => props.theme.colors.N500};
  z-index: 999;
`;
