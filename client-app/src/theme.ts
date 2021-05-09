import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    main: '#edf5e1',
    primary: '#673ab7',
    primaryDark: '#320b86',
    primaryDisabled: '#9575cd',
    background: '#ffffff',
    backgroundAction: '#eeeeee',
    backgroundActionLight: '#f5f5f5',
    backgroundActionDark: '#c2c2c2',
    error: '#f44336',
  },
  text: {
    primary: '#ffffff',
    default: '#616161',
    hint: '#8d8d8d',
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
