import styled from 'styled-components';

export const EffectPanelContainer = styled.div`
  margin: 15px;
`

export const EffectRangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 10px;
  }
`;