import styled from 'styled-components';

interface MenuEntryProps {
  readonly isActive: boolean;
}

export const MenuEntry = styled.div<MenuEntryProps>`
  display: inline-block;
  line-height: 24px;
  padding: 0 16px;
  background-color: ${props => props.isActive ? props.theme.colors.N500 : 'transparent'};
  color: ${props => props.theme.colors.N300};
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.colors.N500}
  }
`;

export const MenuDropdown = styled.div<MenuEntryProps>`
  display: ${props => props.isActive ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  padding: 4px 0;
  min-width: 200px;
  background-color: ${props => props.theme.colors.N700};
  border: 1px solid ${props => props.theme.colors.N500};
`;

export const MenuDropdownItem = styled.div`
  height: 24px;
  line-height: 24px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  color: ${props => props.theme.colors.N300};
  font-size: 12px;

  &:hover {
    background-color: ${props => props.theme.colors.N500};
  }
`;

export const MenuDropdownDivider = styled.div`
  margin: 4px 0;
  height: 1px;
  border-top: 1px solid ${props => props.theme.colors.N500};
  width: 100%;
`;
