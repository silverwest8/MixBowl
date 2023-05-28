import styled from "styled-components";
// import SearchBar from "../common/SearchBar";
import { useRecoilState } from "recoil";
import { searchState } from "../../store/community";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const CommunitySearch = (props) => {
  const [search, setSearch] = useRecoilState(searchState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      navigate("/community/board");
      onSearch();
    }
  };

  const onSearch = () => {};

  return (
    <SearchBox>
      <FaSearch />
      <input
        className="InputBox"
        value={search}
        placeholder={props.placeholder}
        onChange={handleInputChange}
        disabled={props.disabled}
        onKeyDown={onKeyDown}
      />
    </SearchBox>
  );
};
const SearchBox = styled.div`
  margin: 2rem 0;
  max-width: 40.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  border-radius: 50px;
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

export default CommunitySearch;
