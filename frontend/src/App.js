import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStaySignedIn } from "./hooks/useStaySignedIn";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotLoginRecipePage from "./pages/NotLoginRecipePage";
import RecipePage from "./pages/RecipePage";
import WriteRecipePage from "./pages/WriteRecipePage";
import DetailRecipePage from "./pages/DetailRecipePage";
import LoginRecipeRoute from "./routes/LoginRecipeRoute";
import NotLoginRecipeRoute from "./routes/NotLoginRecipeRoute.js";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000,
      retry: 0,
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
          <BrowserRouter>
            <ToastMessage />
            <ModalRenderer />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route element={<LoginRecipeRoute />}>
                  <Route path="recipe" element={<RecipePage />} />
                  <Route path="/recipe/:id" element={<DetailRecipePage />} />
                  <Route path="/writerecipe" element={<WriteRecipePage />} />
                </Route>
                <Route element={<NotLoginRecipeRoute />}>
                  <Route
                    path="notloginrecipe"
                    element={<NotLoginRecipePage />}
                  />
                </Route>
                <Route path="community" element={<HomePage />} />
                <Route path="cocktailbar" element={<HomePage />} />
                <Route path="mypage" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
