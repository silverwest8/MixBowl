import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";

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
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
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
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
