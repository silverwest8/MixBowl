import styled from "styled-components";
import { FaCheckCircle, FaCheck } from "react-icons/fa";

const RecipeInputBox = ({
  type,
  value,
  name,
  placeholder,
  Button,
  onChange,
  message,
  messageType,
  disabled,
}) => {
  return (
    <div>
      {disabled === true ? (
        <InputBox style={{ cursor: "pointer" }}>
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            autoComplete="off"
            style={{ cursor: "pointer" }}
            disabled
          />
          {Button || null}
        </InputBox>
      ) : (
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
      )}

      {message && (
        <Message className={messageType}>
          {messageType === "success" ? (
            <FaCheckCircle />
          ) : messageType === "error" ? (
            "* "
          ) : (
            <FaCheck />
          )}
          {message}
        </Message>
      )}
    </div>
  );
};

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 8px;
  padding: 0.8rem 0.95rem;
  & > input::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
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

export default RecipeInputBox;
