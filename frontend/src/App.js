import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <ToastMessage />
            <ModalRenderer />
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="recipe" element={<HomePage />} />
                  <Route path="community" element={<HomePage />} />
                  <Route path="cocktailbar" element={<HomePage />} />
                  <Route path="mypage" element={<HomePage />} />
                  <Route path="login" element={<HomePage />} />
                  <Route path="register" element={<HomePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
