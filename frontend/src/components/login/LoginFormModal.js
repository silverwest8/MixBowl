import styled from "styled-components";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";

const LoginFormModal = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <h1>로고</h1>
      <Paragraph>로그인 후 다양한 콘텐츠를 즐겨보세요</Paragraph>
      <LoginForm />
    </Modal>
  );
};

const Paragraph = styled.p`
  text-align: center;
  margin: 1.25rem 0;
  font-weight: bold;
  font-size: 1.25rem;
`;

export default LoginFormModal;
