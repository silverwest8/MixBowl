import { useState } from "react";
import Input from "../common/Input";
import DuplicateCheckButton from "./DuplicateCheckButton";
import styled from "styled-components";
import CertificationButton from "./CertificationButton";
import CodeSendButton from "./CodeSendButton";

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    code: "",
    password: "",
    checkPwd: "",
    nickname: "",
  });
  const { email, code, password, checkPwd, nickname } = inputs;
  const [messages, setMessages] = useState({
    email: {
      type: "",
      value: "",
    },
    code: {
      type: "",
      value: "",
    },
    password: {
      type: "",
      value: "8자 이상 16자 미만, 영어 및 숫자 각각 1개 이상 포함",
    },
    checkPwd: {
      type: "",
      value: "",
    },
    nickname: {
      type: "",
      value: "",
    },
  });
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <Form>
      <div className="inputs-wrapper">
        <Input
          name="email"
          value={email}
          onChange={onChange}
          Button={<CodeSendButton email={email} />}
          placeholder="이메일"
          message={messages.email.value}
          messageType={messages.email.type}
        />
        <Input
          name="code"
          value={code}
          onChange={onChange}
          Button={<CertificationButton code={code} />}
          placeholder="인증번호"
          message={messages.code.value}
          messageType={messages.code.type}
        />
      </div>
      <div className="inputs-wrapper">
        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
          message={messages.password.value}
          messageType={messages.password.type}
        />
        <Input
          name="checkPwd"
          type="password"
          value={checkPwd}
          onChange={onChange}
          placeholder="비밀번호 확인"
          message={messages.checkPwd.value}
          messageType={messages.checkPwd.type}
        />
      </div>
      <Input
        name="nickname"
        value={nickname}
        onChange={onChange}
        Button={<DuplicateCheckButton nickname={nickname} />}
        placeholder="닉네임"
        message={messages.nickname.value}
        messageType={messages.nickname.type}
      />
      <Button>완료</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.primaryGold};
`;

export default RegisterForm;
