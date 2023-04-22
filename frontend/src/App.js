import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SamplePage from "./pages/Samplepage";
import LoginPage from "./pages/LoginPage";
import NotLoginRecipePage from "./pages/NotLoginRecipePage";
import RecipePage from "./pages/RecipePage";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";
import { useStaySignedIn } from "./hooks/useStaySignedIn";
import LoginRecipeRoute from "./routes/LoginRecipeRoute";
import NotLoginRecipeRoute from "./routes/NotLoginRecipeRoute.js";

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
  useStaySignedIn();
  return (
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
                <Route element={<LoginRecipeRoute />}>
                  <Route path="recipe" element={<RecipePage />} />
                </Route>
                <Route element={<NotLoginRecipeRoute />}>
                  <Route
                    path="notloginrecipe"
                    element={<NotLoginRecipePage />}
                  />
                </Route>
                <Route path="community" element={<SamplePage />} />
                <Route path="cocktailbar" element={<SamplePage />} />
                <Route path="mypage" element={<SamplePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<SamplePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
