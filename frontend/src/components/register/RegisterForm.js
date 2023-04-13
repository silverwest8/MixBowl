import Input from "../common/Input";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import { useEmail, useNickname, usePassword } from "../../hooks/useRegister";
import axios from "axios";

const RegisterForm = () => {
  const {
    email,
    emailMsg,
    code,
    codeMsg,
    onChangeEmail,
    onChangeCode,
    checkEmailValidation,
    sendCode,
    checkAuth,
  } = useEmail();
  const {
    nickname,
    nicknameMsg,
    onChangeNickname,
    checkDuplication,
    checkNicknameValidation,
  } = useNickname();
  const {
    password,
    passwordMsg,
    checkPwd,
    checkPwdMsg,
    onChangePassword,
    onChangeCheckPwd,
    checkPasswordValidation,
  } = usePassword();
  const navigate = useNavigate();
  const setToastState = useSetRecoilState(toastState);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkEmailValidation()) return;
    if (!checkPasswordValidation()) return;
    if (!checkNicknameValidation()) return;
    try {
      const { data } = await axios.post("/api/user/signup", {
        nickname,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setTimeout(() => {
          setToastState({
            show: true,
            message: "회원가입이 되었습니다.",
            type: "success",
            ms: 1000,
          });
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <div className="inputs-wrapper">
        <Input
          name="email"
          value={email}
          onChange={onChangeEmail}
          Button={
            <button type="button" onClick={sendCode}>
              인증번호 전송
            </button>
          }
          placeholder="이메일"
          message={emailMsg.value}
          messageType={emailMsg.type}
        />
        <Input
          name="code"
          value={code}
          onChange={onChangeCode}
          Button={
            <button type="button" onClick={checkAuth}>
              인증하기
            </button>
          }
          placeholder="인증번호"
          message={codeMsg.value}
          messageType={codeMsg.type}
        />
      </div>
      <div className="inputs-wrapper">
        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          message={passwordMsg.value}
          messageType={passwordMsg.type}
        />
        <Input
          name="checkPwd"
          type="password"
          value={checkPwd}
          onChange={onChangeCheckPwd}
          placeholder="비밀번호 확인"
          message={checkPwdMsg.value}
          messageType={checkPwdMsg.type}
        />
      </div>
      <Input
        name="nickname"
        value={nickname}
        onChange={onChangeNickname}
        Button={
          <button type="button" onClick={checkDuplication}>
            중복확인
          </button>
        }
        placeholder="닉네임"
        message={nicknameMsg.value}
        messageType={nicknameMsg.type}
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
