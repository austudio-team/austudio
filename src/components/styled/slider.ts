import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

export const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    background-color: ${p => p.theme.colors.N500};
  }

  .rc-slider-track {
    background-color: ${p => p.theme.colors.N400};
  }

  .rc-slider-handle {
    border: 2px solid ${p => p.theme.colors.N450};
    &:focus {
      box-shadow: unset;
    }
  }
`;
