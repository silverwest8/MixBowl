import { useEffect } from "react";
import styled from "styled-components";

const LoadingPage = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <Main>
      <h1>Loading...</h1>
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
  & > h1 {
    font-weight: bold;
    font-size: 2rem;
  }
  @media screen and (max-width: 400px) {
    padding: 0 1rem;
  }
`;

export default LoadingPage;
