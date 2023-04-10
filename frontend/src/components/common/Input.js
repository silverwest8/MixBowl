import styled from "styled-components";
import { FaCheckCircle, FaTimes, FaCheck } from "react-icons/fa";

const Input = ({
  type,
  value,
  name,
  placeholder,
  Button,
  onChange,
  message,
  messageType,
}) => {
  return (
    <>
      <InputBox>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
        />
        {Button || null}
      </InputBox>
      {message && (
        <Message className={messageType}>
          {messageType === "success" ? (
            <FaCheckCircle />
          ) : messageType === "error" ? (
            <FaTimes />
          ) : (
            <FaCheck />
          )}
          {message}
        </Message>
      )}
    </>
  );
};

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 8px;
  padding: 0.8rem 0.95rem;
  & > input {
    flex-grow: 1;
  }
  & > input::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
  button {
    color: ${({ theme }) => theme.color.primaryGold};
    text-decoration: underline;
    font-size: 0.875rem;
  }
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0.125rem;

  &.success {
    color: ${({ theme }) => theme.color.green};
  }
  &.error {
    color: ${({ theme }) => theme.color.red};
  }
`;

export default Input;
