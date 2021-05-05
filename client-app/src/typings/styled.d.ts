import 'styled-components';

declare module 'styled-components' {
  export type ThemeBreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
    sizing: Record<ThemeBreakpointKey, string>;
    transition: {
      default: string;
    };
  }
}
