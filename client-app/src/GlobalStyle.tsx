import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
`;

export default GlobalStyle;
