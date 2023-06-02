import { TextInput, Button } from "@tremor/react";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import Router from "next/router";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setMessage((state) => ({
        ...state,
        email: "* 이메일을 입력하세요.",
      }));
      return;
    }
    if (password === "") {
      setMessage({
        email: "",
        password: "* 비밀번호를 입력하세요.",
      });
      return;
    }
    setMessage({
      email: "",
      password: "",
    });
    setLoading(true);
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      setLoading(false);
      if (data.success) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 23);
        setCookie("token", data.accessToken, {
          secure: true,
          expires,
        });
        setSuccess(true);
        Router.push("/");
      } else {
        setSuccess(false);
      }
    } catch (e) {
      setLoading(false);
      setSuccess(false);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <TextInput
          placeholder="이메일"
          name="email"
          value={email}
          onChange={onChange}
          error={!!message.email}
          errorMessage={message.email}
        />
      </div>
      <div>
        <TextInput
          placeholder="비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          error={!!message.password}
          errorMessage={message.password}
        />
      </div>
      {success !== undefined && !success && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          아이디 혹은 비밀번호가 일치하지 않습니다.
        </p>
      )}
      <Button size="xs" type="submit" disabled={loading}>
        로그인
      </Button>
    </form>
  );
}
