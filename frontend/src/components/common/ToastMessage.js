import { useRecoilState } from "recoil";
import { FaRegCheckCircle, FaInfoCircle } from "react-icons/fa";
import Fade from "@mui/material/Fade";
import { toastState } from "../../store/toast";
import styled from "styled-components";
import { useEffect } from "react";

const ToastMessage = () => {
  const [{ show, message, type, ms }, setToastState] =
    useRecoilState(toastState);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setToastState((state) => ({ ...state, show: false }));
      }, ms);
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
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  max-width: 326px;
  width: 90vw;
  padding: 1rem 1.25rem;
  z-index: 200;
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

export default ToastMessage;
