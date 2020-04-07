import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MenuBarContainer = styled.div`
  display: flex;
  height: 25px;
  width: 100%;
  background-color: ${props => props.theme.colors.N700};
  border-bottom: 1px solid ${props => props.theme.colors.N800};
  flex-shrink: 0;
`;

export const FunctionBarcontainer = styled.div`
  display: flex;
  height: 43px;
  width: 100%;
  background-color: ${props => props.theme.colors.N700};
  border-bottom: 1px solid ${props => props.theme.colors.N800};
  flex-shrink: 0;
`;

export const EditorContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.N800};
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
`;
