import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <Main>
      <h1>Oops!</h1>
      <p>404 - PAGE NOT FOUND</p>
      <button>
        <Link to="/">홈페이지로 가기</Link>
      </button>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: calc(calc(var(--vh, 1vh) * 100) - 3.5rem);
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 2rem;
  }
  & > button {
    background-color: ${({ theme }) => theme.color.primaryGold};
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
  }
`;

export default NotFoundPage;
