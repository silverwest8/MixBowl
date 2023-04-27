import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../common/SearchBar";

const RecipeSearch = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchBox>
      <SearchBar
        value={searchValue}
        placeholder={props.placeholder}
        onChange={handleInputChange}
        showCloseButton={false}
        disabled={props.disabled}
      />
    </SearchBox>
  );
};
const SearchBox = styled.div`
  margin: auto;
  margin-top: 40px;
  width: 40.25rem;
  height: 2.875rem;
  @media screen and (max-width: 1024px) {
    width: 35.25rem;
  }
  @media screen and (max-width: 720px) {
    width: 30.25rem;
  }
`;

export default RecipeSearch;
