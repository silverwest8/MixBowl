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
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import RecipeWritePage from "./pages/RecipeWritePage";
import DetailRecipePage from "./pages/DetailRecipePage";
import RecipeEditPage from "./pages/RecipeEditPage";
import RecipeRoute from "./routes/RecipeRoute";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";
import NotFoundPage from "./pages/NotFoundPage";
import CommunityPostDetailPage from "./pages/CommunityPostDetailPage";
import CommunityPostingPage from "./pages/CommunityPostingPage";
import CommunityBoardPage from "./pages/CommunityBoardPage";
import MyPage from "./pages/MyPage";
import MyRecipePage from "./pages/MyRecipePage";
import MyPostingPage from "./pages/MyPostingPage";
import MyCommentPage from "./pages/MyCommentPage";
import MyReviewPage from "./pages/MyReviewPage";
import CommunityEditingPage from "./pages/CommunityEditingPage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
                  <Route path="/recipe/:id/edit" element={<RecipeEditPage />} />
                  <Route path="/recipe/:id" element={<DetailRecipePage />} />

                  <Route path="/recipe/write" element={<RecipeWritePage />} />
                </Route>
                <Route path="mypage" element={<MyPage />} />
                <Route path="mypage/recipe" element={<MyRecipePage />} />
                <Route path="mypage/posting" element={<MyPostingPage />} />
                <Route path="mypage/comment" element={<MyCommentPage />} />
                <Route path="mypage/review" element={<MyReviewPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cocktailbar" element={<CocktailBarPage />}>
                  <Route path=":id" element={<CocktailBarPage />} />
                </Route>
                <Route path="community" element={<CommunityHomePage />} />
                <Route
                  path="community/board"
                  element={<CommunityBoardPage />}
                />
                <Route
                  path="community/:id"
                  element={<CommunityPostDetailPage />}
                />
                <Route
                  path="community/posting"
                  element={<CommunityPostingPage />}
                />
                <Route
                  path="community/edit/:id"
                  element={<CommunityEditingPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
