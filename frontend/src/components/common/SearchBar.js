import styled from "styled-components";
import { FaTimesCircle, FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  name,
  placholder,
  showSearchButton,
  onClick,
  onChange,
}) => {
  return (
    <SearchBarBox>
      <input
        value={value}
        name={name}
        placeholder={placholder}
        onChange={onChange}
      />
      <button onClick={onClick}>
        {showSearchButton ? <FaSearch /> : <FaTimesCircle />}
      </button>
    </SearchBarBox>
  );
};

const SearchBarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.7rem 1.25rem;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  & > input {
    flex-grow: 1;
  }
  & > input::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default SearchBar;
