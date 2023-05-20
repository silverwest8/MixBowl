import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../store/auth";
import { setToken } from "../../utils/token";
import Input from "../common/Input";
import styled from "styled-components";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";

const LoginForm = ({ handleClose }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const [messages, setMessages] = useState({
    email: "",
    password: "",
  });
  const [failMessage, setFailMessage] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setMessages((state) => ({
        ...state,
        email: "이메일을 입력해주세요.",
      }));
      return;
    }
    if (password === "") {
      setMessages({
        email: "",
        password: "비밀번호를 입력해주세요.",
      });
      return;
    }
    setMessages({
      email: "",
      password: "",
    });
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (data.success) {
        setAuthState({
          isLoggedin: true,
        });
        setToken({
          accessToken: data.tokens.token.accessToken,
          refreshToken: data.tokens.token.refreshToken,
        });
        if (handleClose) handleClose();
        navigate(params.get("return_url") ? params.get("return_url") : "/");
      } else {
        setFailMessage("아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch {
      setFailMessage("아이디 또는 비밀번호를 확인해주세요.");
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={email}
        name="email"
        onChange={onChange}
        placeholder="이메일"
        message={messages.email}
        messageType="error"
      />
      <Input
        value={password}
        name="password"
        type="password"
        onChange={onChange}
        placeholder="비밀번호"
        message={messages.password}
        messageType="error"
      />
      {failMessage && (
        <p className="fail-message">
          <FaInfoCircle />
          {failMessage}
        </p>
      )}
      <Button>로그인</Button>
      <Link className="link-wrapper" to="/register">
        <span>아직 회원이 아니신가요?</span>
        <span className="register">회원가입하기</span>
      </Link>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  .link-wrapper {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.lightGray};
    .register {
      color: ${({ theme }) => theme.color.secondGold};
    }
  }
  .fail-message {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.red};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  margin-top: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
`;

export default LoginForm;
