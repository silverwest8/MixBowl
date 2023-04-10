import { Link, useHref } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authState } from "../../store/auth";

const AuthButtonBox = () => {
  const { isLoggined } = useRecoilValue(authState);
  const href = useHref();
  return isLoggined ? (
    <ButtonBox>
      <button className={href.includes("mypage") ? "active" : ""}>
        <Link to="mypage">마이페이지</Link>
      </button>
      <button>로그아웃</button>
    </ButtonBox>
  ) : (
    <ButtonBox>
      <button>
        <Link to="login">로그인</Link>
      </button>
      <button>
        <Link to="register">회원가입</Link>
      </button>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  gap: 0.625rem;
  justify-content: flex-end;
  flex-shrink: 0;
  & > button {
    padding: 0.3rem 0.5rem;
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 12px;
    background-color: transparent;
    flex-shrink: 0;
    font-size: 0.875rem;
    &.active {
      background-color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  @media screen and (max-width: 840px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 0;
  }
`;

export default AuthButtonBox;
