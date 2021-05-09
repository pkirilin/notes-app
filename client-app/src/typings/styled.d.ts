import 'styled-components';

declare module 'styled-components' {
  export type ThemeBreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface DefaultTheme {
    colors: {
      main: string;
      primary: string;
      primaryDark: string;
      primaryDisabled: string;
      background: string;
      backgroundAction: string;
      backgroundActionLight: string;
      backgroundActionDark: string;
      error: string;
    };
    text: {
      primary: string;
      default: string;
      hint: string;
    };
    borders: {
      default: string;
    };
    transition: {
      default: string;
    };
    sizing: Record<ThemeBreakpointKey, string>;
    breakpoints: Record<ThemeBreakpointKey, string>;
  }
}
