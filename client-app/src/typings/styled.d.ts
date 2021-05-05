import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      primary: string;
      primaryDark: string;
      primaryDisabled: string;
    };
    text: {
      primary: string;
    };
    borders: {
      default: string;
    };
    sizing: {
      none: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    transition: {
      default: string;
    };
  }
}
