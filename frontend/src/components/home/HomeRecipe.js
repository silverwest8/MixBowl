import styled from "styled-components";
import { FaTrophy } from "react-icons/fa";

const HomeTitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  .logo {
    color: ${({ theme, num }) =>
      num === 1
        ? theme.color.lightGray
        : num === 2
        ? theme.color.primaryGold
        : num === 3
        ? theme.color.red
        : null};
    margin-right: 0.75rem;
  }
  p {
    text-size: 1.5rem;
    font-weight: bold;
  }
`;
const HomeRecipe = ({ num }) => {
  return (
    <>
      <HomeTitleBox num={num}>
        <FaTrophy className="logo"></FaTrophy>
        <p className="bold">이번주 인기 칵테일 레시피</p>
      </HomeTitleBox>
    </>
  );
};

export default HomeRecipe;
