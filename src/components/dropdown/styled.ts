import styled from 'styled-components';
import { ReactComponent as Close } from '@assets/svg/close.svg';
import { ReactComponent as Plus } from '@assets/svg/plus.svg';

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
  overflow-y: auto;
  background-color: ${props => props.theme.colors.N500};
  border: 1px solid ${props => props.theme.colors.N400};
  border-top: none;
  z-index: 1;
`;


// DroopdownItem
export const DropdownItemWrapper = styled.div`
  top: 100%;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.N300};
  z-index: 1;
`;

export const ItemWrapper = styled.div`
  font-size: 10px;
  height: 20px;
  line-height: 10px;
  background: ${props => props.theme.colors.N500};
  padding: 0 5px;
  margin: 2px 5px;
  color: ${props => props.theme.colors.N00};
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
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
  height: 12px;
  width: 12px;
  margin-right: 5px;
`;

export const AddEffectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 22px;
  background-color: ${props => props.theme.colors.N300};

`

export const AddEffectIcon = styled(Plus)`
  & path {
      fill: ${p => p.theme.colors.N600};
    }
    cursor: pointer;
    height: 12px;
    width: 12px;
`