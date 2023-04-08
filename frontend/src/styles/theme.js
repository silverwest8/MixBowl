import { createGlobalStyle } from "styled-components";

export const theme = {
  black: "#111111",
  primaryGold: "#e9aa33",
  secondGold: "#ed9b00",
  lightGray: "#cfcfcf",
  darkGray: "#3e3e3e",
  red: "#ff542e",
  green: "#1ed900",
};

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${theme.black};
    color: white;
  }
`;
