import styled from "styled-components";
import { FaTimesCircle, FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  name,
  placeholder,
  showCloseButton,
  onClear,
  onSearch,
  onChange,
  disabled,
}) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) onSearch();
  };
  return (
    <SearchBarBox>
      <FaSearch />
      <input
        disabled={disabled !== undefined ? disabled : false}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {showCloseButton && (
        <button onClick={onClear}>
          <FaTimesCircle />
        </button>
      )}
    </SearchBarBox>
  );
};

const SearchBarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  border-radius: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.black};
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  & > input {
    flex-grow: 1;
    font-size: 0.875rem;
  }
  & > input::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default SearchBar;
