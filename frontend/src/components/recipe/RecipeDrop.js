import DropdownMenu from "../common/DropdownMenu";
import styled from "styled-components";

const RecipeDrop = () => {
  return (
    <DropBox>
      <DropdownMenu options={["최신순", "추천순"]}></DropdownMenu>
    </DropBox>
  );
};

const DropBox = styled.div`
  position: relative;
  left: 90%;
`;

export default RecipeDrop;
