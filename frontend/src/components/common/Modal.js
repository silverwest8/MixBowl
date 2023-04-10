import Dialog from "@mui/material/Dialog";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Modal = ({
  title,
  content,
  children,
  handleClose,
  onCancel,
  onConfirm,
  onSubmit,
}) => {
  return (
    <Dialog onClose={handleClose} open={true}>
      <Button onClick={handleClose}>
        <FaTimes />
      </Button>
      <ModalWrapper>
        <h1 className="modal-title">{title}</h1>
        {content && <p className="modal-content">{content}</p>}
        {children}
        {(onConfirm || onSubmit) && (
          <ButtonWrapper>
            <button onClick={onCancel} className="cancel">
              취소
            </button>
            <button onClick={onConfirm || onSubmit}>
              {onConfirm ? "확인" : "완료"}
            </button>
          </ButtonWrapper>
        )}
      </ModalWrapper>
    </Dialog>
  );
};

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.color.primaryGold};
`;

const ModalWrapper = styled.div`
  padding: 3rem 2rem 2rem;
  background-color: ${({ theme }) => theme.color.darkGray};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  .modal-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .modal-content {
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  font-size: 1rem;
  align-items: center;
  margin-top: 1.5rem;
  & > button {
    border-radius: 8px;
    flex-grow: 1;
    padding: 0.5rem 1.7rem;
    color: inherit !important;
    font-size: 0.875rem;
    line-height: 1.75;
    background-color: ${({ theme }) => theme.color.primaryGold};
    &.cancel {
      background-color: ${({ theme }) => theme.color.gray};
    }
  }
`;

export default Modal;
