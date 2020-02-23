import styled from 'styled-components';

export const AudioChannelContainer = styled.div`
  position: relative;
  height: 122px;
  min-width: 219px;
  max-width: 219px;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-left: 1px;
  margin-right: 2px;
  background-color: ${props => props.theme.colors.N700};
  color: ${props => props.theme.colors.N100};
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

export const ChannelButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 100%;
  border-left: 1px solid ${props => props.theme.colors.N800};
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
