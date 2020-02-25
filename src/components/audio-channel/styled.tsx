import styled from 'styled-components';

export const AudioChannelContainer = styled.div`
  position: relative;
  height: 122px;
  width: 219px;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-left: 1px;
  margin-right: 2px;
  background-color: ${props => props.theme.colors.N700};
  color: ${props => props.theme.colors.N200};
  & + & {
    margin-top: 4px;
  }
`;

export const TopChannel = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  font-size: 13px;
  border-bottom: 1px solid ${props => props.theme.colors.N800};
`;

export const ChannelName = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.N600};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 1;
  line-height: 12px;
`;

export const ChannelButtonGroup = styled.div`
  display: flex;
  height: 100%;
  background-color: ${props => props.theme.colors.N600};
`;

interface ChannelButtonProps {
  active?: boolean;
}

export const ChannelButton = styled.div<ChannelButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 100%;
  border-left: 1px solid ${props => props.theme.colors.N800};
  color: ${p => p.active ? p.theme.colors.P300 : 'inherit'};
  background-color: ${p => p.active ? p.theme.colors.N800 : 'inherit'};

  &:hover {
    color: ${p => p.active ? p.theme.colors.P100 : p.theme.colors.N100};
    background-color: ${props => props.theme.colors.N500};
  }
`;

export const RecordButton = styled(ChannelButton)<ChannelButtonProps>`
  color: ${p => p.active ? p.theme.colors.R300 : 'inherit'};
  
  &:hover {
    color: ${p => p.active ? p.theme.colors.R100 : p.theme.colors.N100};
  }
`;

export const MiddleChannel = styled.div`
  width: 100%;
  margin: 0;
  padding: 10px 6px;
  flex-grow: 1;
`;

export const Range = styled.input`
  -webkit-appearance: none;
  background-color: #ececec;
  height: 4px;
  margin-left: 8px;
  width: 162px;
  transform: translateY(-2px);
  outline: none;
  cursor: ew-resize;
`;

export const BottomChannel = styled.div`
  margin-bottom: 4px;
`;

export const RangeContainer = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;

  & + & {
    margin-top: 20px;
  }
`;
