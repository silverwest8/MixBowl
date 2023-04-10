import { createTheme } from "@mui/material";
import { createGlobalStyle } from "styled-components";

export const theme = {
  color: {
    black: "#111111",
    primaryGold: "#e9aa33",
    secondGold: "#ed9b00",
    lightGray: "#cfcfcf",
    darkGray: "#3e3e3e",
    red: "#ff542e",
    green: "#1ed900",
    gray: "#b3b3b3",
  },
  device: {
    mobile: "max-width: 620px",
  },
};

export const muiTheme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "sans-serif",
    ].join(","),
  },
});

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${theme.color.black};
    color: white;
  }
`;
