import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { FaRegCheckCircle, FaInfoCircle } from "react-icons/fa";
import Fade from "@mui/material/Fade";
import { toastState, toastShowState } from "../../store/toast";
import styled from "styled-components";
import { useEffect } from "react";

//   const setToastState = useSetRecoilState(toastState);
const ToastMessage = () => {
  const [{ show, message, type, ms }, setToastState] =
    useRecoilState(toastState);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setToastState((state) => ({ ...state, show: false }));
      }, ms || 2000);
    }
  }, [show]);
  return (
    <Fade in={show}>
      <Message className={type}>
        {type === "success" ? <FaRegCheckCircle /> : <FaInfoCircle />}
        {message}
      </Message>
    </Fade>
  );
};

const Message = styled.p`
  position: fixed;
  top: 50px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  border-radius: 12px;
  max-width: 326px;
  width: 90vw;
  padding: 1rem 1.25rem;
  z-index: 2000;
  svg {
    margin-top: 0.1rem;
  }
  &.success {
    background-color: ${({ theme }) => theme.color.green};
  }
  &.error {
    background-color: ${({ theme }) => theme.color.red};
  }
  @media screen and (${({ theme }) => theme.device.mobile}) {
    right: 50%;
    transform: translateX(50%);
  }
`;

// ToastMessage 사용 예시
export const ToastMessageShowButton = () => {
  const setToastState = useSetRecoilState(toastState);
  const showToast = useRecoilValue(toastShowState);
  return (
    <button
      disabled={showToast}
      onClick={() =>
        setToastState({
          show: true,
          message: "삭제가 완료되었습니다.",
          type: "success",
          ms: 2000,
        })
      }
    >
      토스트 메시지 띄우기
    </button>
  );
};

export default ToastMessage;
