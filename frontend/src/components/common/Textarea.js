import styled from "styled-components";
import { FaCheckCircle, FaCheck } from "react-icons/fa";

const Textarea = ({
  value,
  name,
  rows,
  placeholder,
  Button,
  onChange,
  message,
  messageType,
}) => {
  return (
    <Wrapper>
      <InputBox>
        <textarea
          name={name}
          value={value}
          rows={rows}
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
            "*"
          ) : (
            <FaCheck />
          )}
          {message}
        </Message>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 8px;
  padding: 0.8rem 0.95rem;
  & > textarea {
    flex-grow: 1;
    background-color: transparent;
    border: none;
  }
  & > textarea::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
  & > textarea:focus {
    outline: none;
  }
  button {
    color: ${({ theme }) => theme.color.primaryGold};
    text-decoration: underline;
    font-size: 0.875rem;
    flex-shrink: 0;
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

export default Textarea;
