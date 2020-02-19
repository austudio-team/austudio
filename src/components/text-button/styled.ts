import styled from 'styled-components';
import { getHoverColor, getNormalColor } from '@components/styled/functionBar';

interface ContainerProps {
  width?: number;
  active?: boolean;
  disable?: boolean;
}

export const getStyledIcon = (icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) => {
  return styled(icon)`
    height: 100%;
    width: auto;
  `;
}

export const StyledText = styled.span`
  margin-left: 4px;
  font-size: 12px;
`;

export const TextButtonContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  padding: 10px;

  color: ${props => getNormalColor(props)};
  & svg {
    path {
      fill: ${props => getNormalColor(props)};
    }
  }

  &:hover {
    color: ${props => getHoverColor(props)};
    & svg {
      path {
        fill: ${props => getHoverColor(props)};
      }
    }
  }
`;
