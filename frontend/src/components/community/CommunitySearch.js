import styled from "styled-components";
import SearchBar from "../common/SearchBar";
import { useRecoilState } from "recoil";
import { searchState } from "../../store/community";

const CommunitySearch = (props) => {
  const [search, setSearch] = useRecoilState(searchState);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) onSearch();
  };

  const onSearch = () => {};

  return (
    <SearchBox>
      <SearchBar
        value={search}
        placeholder={props.placeholder}
        onChange={handleInputChange}
        showCloseButton={false}
        disabled={props.disabled}
        onKeyDown={onKeyDown}
        onSearch={onSearch}
      />
    </SearchBox>
  );
};
const SearchBox = styled.div`
  margin: 2rem auto;
  max-width: 40.25rem;
  width: 100%;
`;

export default CommunitySearch;
