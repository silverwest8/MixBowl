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
  margin: 2rem auto;
  max-width: 40.25rem;
  width: 100%;
`;

export default RecipeSearch;
