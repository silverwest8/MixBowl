import { useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <Main>
      <h1>로고</h1>
      <p>로그인 후 다양한 콘텐츠를 즐겨보세요</p>
      <LoginForm />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  height: calc(calc(var(--vh, 1vh) * 100) - 4rem);
  & > p {
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    word-break: keep-all;
  }
  @media screen and (max-width: 400px) {
    padding: 0 1rem;
  }
`;

export default LoginPage;
