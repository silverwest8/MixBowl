import styled from "styled-components";
import { FaCocktail } from "react-icons/fa";

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

const HomeBar = ({ num }) => {
  return (
    <>
      <HomeTitleBox num={num}>
        <FaCocktail className="logo"></FaCocktail>
        <p>내 주변 칵테일 바</p>
      </HomeTitleBox>
    </>
  );
};

export default HomeBar;
