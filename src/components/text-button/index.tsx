import React from 'react';
import { StyledText, TextButtonContainer, getStyledIcon } from './styled';

interface TextButtonProps {
  active?: boolean;
  disable?: boolean;
  text: string;
  width?: number;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type Props = TextButtonProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TextButton: React.FC<Props> = props => {
  const { icon ,width, text, disable, active, ref, ...otherProps } = props;
  const Icon = getStyledIcon(icon);
  return (
    <TextButtonContainer
      {...otherProps}
      width={width}
      active={active}
      disable={disable}
    >
      <Icon />
      <StyledText>{text}</StyledText>
    </TextButtonContainer>
  );
}
