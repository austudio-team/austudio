import styled from "styled-components";


export const TrackContainer = styled.div`
  height: 122px;
  width: 100%;
  background-color: ${props => props.theme.colors.N700};

  & + & {
    margin-top: 4px;
  }
`;
