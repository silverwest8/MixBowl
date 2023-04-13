import { useRef, useState } from "react";
import axios from "axios";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameMsg, setNickNameMsg] = useState({
    type: "",
    value: "",
  });
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const checkedNickname = useRef("");
  const isDuplicated = useRef(true);
  const checkDuplication = async () => {
    if (nickname === "") {
      setNickNameMsg({
        type: "error",
        value: "닉네임을 입력해주세요.",
      });
      return;
    }
    try {
      const { data } = await axios.put("/api/user/nicknamedupcheck", {
        checkname: nickname,
      });
      if (data.success) {
        isDuplicated.current = false;
        setNickNameMsg({
          type: "success",
          value: "사용 가능한 닉네임입니다.",
        });
      } else {
        isDuplicated.current = true;
        setNickNameMsg({
          type: "error",
          value: "이미 사용중인 닉네임입니다.",
        });
      }
      checkedNickname.current = nickname;
    } catch (e) {
      console.log(e);
    }
  };
  const checkNicknameValidation = () => {
    if (nickname === "") {
      setNickNameMsg({
        type: "error",
        value: "닉네임을 입력해주세요.",
      });
      return false;
    }
    if (nickname !== checkedNickname.current) {
      setNickNameMsg({
        type: "error",
        value: "닉네임 중복확인을 해주세요.",
      });
      return false;
    }
    if (isDuplicated.current) {
      setNickNameMsg({
        type: "error",
        value: "이미 사용중인 닉네임입니다.",
      });
      return false;
    }
    setNickNameMsg({
      type: "",
      value: "",
    });
    return true;
  };
  return {
    nickname,
    nicknameMsg,
    onChangeNickname,
    checkDuplication,
    checkNicknameValidation,
  };
};

export const usePassword = () => {
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [passwordMsg, setPasswordMsg] = useState({
    type: "",
    value: "8자 이상 16자 미만, 영어 및 숫자 각각 1개 이상 포함",
  });
  const [checkPwdMsg, setCheckPwdMsg] = useState({
    type: "",
    value: "",
  });
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeCheckPwd = (e) => {
    setCheckPwd(e.target.value);
  };
  const checkPasswordValidation = () => {
    if (password === "") {
      setPasswordMsg({ type: "error", value: "비밀번호를 입력해주세요" });
      return false;
    }
    if (password.length < 8 || password.length > 15) {
      setPasswordMsg({
        type: "error",
        value: "8자 이상 16자 미만이어야 합니다.",
      });
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/.test(password)) {
      setPasswordMsg({
        type: "error",
        value: "영어, 숫자가 각각 1개 이상 포함되어야 합니다.",
      });
      return false;
    }
    setPasswordMsg({
      type: "",
      value: "",
    });
    if (checkPwd === "") {
      setCheckPwdMsg({
        type: "error",
        value: "비밀번호 확인을 입력해주세요.",
      });
      return false;
    }
    if (password !== checkPwd) {
      setCheckPwdMsg({ type: "error", value: "비밀번호가 일치하지 않습니다." });
      return false;
    }
    setCheckPwdMsg({
      type: "",
      value: "",
    });
    return true;
  };
  return {
    password,
    checkPwd,
    passwordMsg,
    checkPwdMsg,
    onChangePassword,
    onChangeCheckPwd,
    checkPasswordValidation,
  };
};

export const useEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailMsg, setEmailMsg] = useState({
    type: "",
    value: "",
  });
  const [codeMsg, setCodeMsg] = useState({
    type: "",
    value: "",
  });
  const codeSendEmail = useRef("");
  const verifiedEmail = useRef("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  const sendCode = () => {
    // TODO: call API
    /* 성공 로직 */
    setEmailMsg({
      type: "",
      value: "인증번호가 발송되었습니다. 메일함을 확인해주세요.",
    });
    codeSendEmail.current = email;
  };
  const checkAuth = () => {
    // TODO: call API
    /* 성공로직 */
    setCodeMsg({
      type: "success",
      value: "인증이 완료되었습니다.",
    });
    verifiedEmail.current = email;
    /* 실패로직 */
    // setCodeMsg({
    //   type: "error",
    //   value: "인증번호가 불일치합니다.",
    // });
  };
  const checkEmailValidation = () => {
    if (email === "") {
      setEmailMsg({
        type: "error",
        value: "이메일을 입력해주세요.",
      });
      setCodeMsg({
        type: "",
        value: "",
      });
      return false;
    }
    if (codeSendEmail.current !== email) {
      setEmailMsg({
        type: "error",
        value: "이메일로 인증번호를 전송해주세요.",
      });
      setCodeMsg({
        type: "",
        value: "",
      });
      return false;
    }
    setEmailMsg({
      type: "",
      value: "",
    });
    if (code === "") {
      setCodeMsg({
        type: "error",
        value: "인증번호를 입력해주세요.",
      });
      return false;
    }
    if (verifiedEmail.current !== codeSendEmail.current) {
      setCodeMsg({
        type: "error",
        value: "인증하기 버튼을 눌러 인증을 마무리해주세요.",
      });
      return false;
    }
    if (verifiedEmail.current !== email) {
      setCodeMsg({
        type: "error",
        value: "인증번호가 불일치합니다.",
      });
      return false;
    }
    setCodeMsg({
      type: "",
      value: "",
    });
    return true;
  };
  return {
    email,
    code,
    emailMsg,
    codeMsg,
    onChangeEmail,
    onChangeCode,
    checkEmailValidation,
    sendCode,
    checkAuth,
  };
};
