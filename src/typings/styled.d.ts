// import original module declarations
import 'styled-components';
import theme from '../constants/theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      N300: string,
      N400: string,
      N500: string,
      N600: string,
      N700: string,
      N800: string,
    },
  }
}
