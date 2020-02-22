import styled from 'styled-components';

interface DropdownContainerProps {
  cssWidth?: number;
  cssMargin?: string;
}

export const DropdownContainer = styled.div<DropdownContainerProps>`
  position: relative;
  width: ${props => props.cssWidth ? `${props.cssWidth}px` : '100%'};
  margin: ${props => props.cssMargin || 'initial'};
`;

export const DropdownInnerContainer = styled.div`
  width: 100%;
  height: 22px;
  border: 1px solid ${props => props.theme.colors.N400};
  color: ${props => props.theme.colors.N100};
  background-color: ${props => props.theme.colors.N600};
  line-height: 22px;
  padding: 0 12px;
  font-size: 12px;

  &::after {
    content: ' ';
    position: absolute;
    right: 12px;
    top: 8px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 6px solid ${props => props.theme.colors.N100};
    pointer-events: none;
  }
`;

export const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 22px;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.N500};
  border: 1px solid ${props => props.theme.colors.N400};
  border-top: none;
`;
