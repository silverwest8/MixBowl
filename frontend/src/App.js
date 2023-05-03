import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStaySignedIn } from "./hooks/useStaySignedIn";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CocktailBarPage from "./pages/CocktailBarPage";
import CommunityHomePage from "./pages/CommunityHomePage";
import PostingPage from "./pages/PostingPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import RecipeWritePage from "./pages/RecipeWritePage";
import DetailRecipePage from "./pages/DetailRecipePage";
import RecipeEditPage from "./pages/RecipeEditPage";
import RecipeRoute from "./routes/RecipeRoute";
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
                <Route element={<RecipeRoute />}>
                  <Route path="recipe" element={<RecipePage />} />
                  <Route path="/recipe/:id" element={<DetailRecipePage />} />
                  <Route path="/recipe/:id/edit" element={<RecipeEditPage />} />
                  <Route path="/recipe/write" element={<RecipeWritePage />} />
                </Route>
                <Route path="mypage" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cocktailbar" element={<CocktailBarPage />}>
                  <Route path=":id" element={<CocktailBarPage />} />
                </Route>
                <Route path="community" element={<CommunityHomePage />} />
                <Route path="community/posting" element={<PostingPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
