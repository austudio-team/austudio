// import original module declarations
import 'styled-components';
import theme from '../constants/theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      N00: string,
      N100: string,
      N200: string,
      N300: string,
      N400: string,
      N450: string,
      N500: string,
      N600: string,
      N700: string,
      N800: string,
      P100: string,
      P300: string,
      P500: string,
      P700: string,
      R300: string,
      R500: string,
      R700: string,
    },
    animation: {
      normal: string,
    },
  }
}
