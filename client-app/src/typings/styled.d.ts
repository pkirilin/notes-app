import 'styled-components';

declare module 'styled-components' {
  export type ThemeBreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface DefaultTheme {
    colors: {
      primary: {
        default: string;
        dark: string;
        disabled: string;
      };
      grey: {
        default: string;
        light: string;
        dark: string;
      };
      error: {
        default: string;
      };
      background: {
        default: string;
      };
      text: {
        primary: string;
        default: string;
        hint: string;
      };
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
