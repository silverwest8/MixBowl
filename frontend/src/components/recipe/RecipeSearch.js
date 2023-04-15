import styled from "styled-components";
import SearchBar from "../common/SearchBar";

const RecipeSearch = () => {
  return (
    <SearchBox>
      <SearchBar
        placholder="로그인 이후 검색이 가능합니다!"
        showSearchButton={true}
      />
    </SearchBox>
  );
};

const SearchBox = styled.div`
  margin: auto;
  margin-top: 40px;
  width: 40.25rem;
  heighgt: 2.875rem;
`;

export default RecipeSearch;
