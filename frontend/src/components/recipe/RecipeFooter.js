import styled from "styled-components";
import { Link } from "react-router-dom";

const RecipeFooter = () => {
  return (
    <LoginBox>
      <p>더 많은 콘텐츠를 보고 싶다면?</p>
      <LoginButton>
        <Link to="../login">로그인하기</Link>
      </LoginButton>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  text-align: center;
`;

const LoginButton = styled.button`
  background-color: #e9aa33;
  border-radius: 0.75rem;
  width: 6.3rem;
  height: 2.125rem;
  margin-top: 1rem;
`;

export default RecipeFooter;
