import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: {
      default: '#673ab7',
      dark: '#320b86',
      disabled: '#9575cd',
    },
    grey: {
      default: '#eeeeee',
      light: '#f5f5f5',
      dark: '#c2c2c2',
    },
    error: {
      default: '#f44336',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      default: '#616161',
      hint: '#8d8d8d',
    },
  },
  borders: {
    default: '1px',
  },
  transition: {
    default: '0.5s',
  },
  sizing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '32px',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
};

export default theme;
