import Select from 'rc-select';
import 'rc-select/assets/index.less';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  .rc-select {
    width: 120px;
  }
  .rc-select-selector {
    border-color: ${props => props.theme.colors.N400} !important;
  }
`;
