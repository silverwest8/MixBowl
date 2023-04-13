import { useEffect, useRef } from "react";
import styled from "styled-components";
import RegisterForm from "../components/register/RegisterForm";

const RegisterPage = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.innerHeight > ref.current.scrollHeight) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      ref.current.style.height = "calc(calc(var(--vh, 1vh) * 100) - 4rem)";
    } else {
      ref.current.style.margin = "2rem auto";
    }
  }, []);
  return (
    <Main ref={ref}>
      <h1>회원가입</h1>
      <RegisterForm />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  @media screen and (max-width: 400px) {
    padding: 0 1rem;
  }
`;

export default RegisterPage;
