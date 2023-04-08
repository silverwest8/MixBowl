import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="recipe" element={<HomePage />} />
              <Route path="community" element={<HomePage />} />
              <Route path="cocktailbar" element={<HomePage />} />
              <Route path="mypage" element={<HomePage />}>
                <Route path=":type" element={<HomePage />} />
              </Route>
              <Route path="login" element={<HomePage />} />
              <Route path="register" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
