import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    main: '#edf5e1',
    primary: '#673ab7',
    primaryDark: '#320b86',
    primaryDisabled: '#9575CD',
  },
  text: {
    primary: '#ffffff',
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
