import styled from "styled-components";
import { FaCocktail } from "react-icons/fa";

const HomeBar = ({ num }) => {
  return (
    <Section>
      <HomeTitleBox num={num}>
        <FaCocktail className="logo"></FaCocktail>
        <p>내 주변 칵테일 바</p>
      </HomeTitleBox>
      <ItemBox>지도</ItemBox>
    </Section>
  );
};

const Section = styled.div`
  padding: 0 1rem;
  margin: 2rem auto 0;
  max-width: 1144px;
`;

const HomeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
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

const ItemBox = styled.div``;

export default HomeBar;
