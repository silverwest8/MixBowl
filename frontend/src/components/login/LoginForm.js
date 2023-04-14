import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../store/auth";
import { setToken } from "../../utils/token";
import Input from "../common/Input";
import styled from "styled-components";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";

const LoginForm = () => {
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
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        setAuthState({
          isLoggedin: true,
        });
        setToken({
          accessToken: data.tokens.token.accessToken,
          refreshToken: data.tokens.token.refreshToken,
        });
        navigate("/");
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
      <div className="link-wrapper">
        <Link to="/login" className="find-pwd-link">
          비밀번호를 잊으셨나요?
        </Link>
        <span />
        <Link to="/register" className="register-link">
          회원가입
        </Link>
      </div>
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
    gap: 1rem;
    justify-content: center;
    font-size: 0.875rem;
    .find-pwd-link {
      color: ${({ theme }) => theme.color.lightGray};
    }
    .register-link {
      color: ${({ theme }) => theme.color.secondGold};
    }
    span {
      width: 1px;
      background-color: ${({ theme }) => theme.color.gray};
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
