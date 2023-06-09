import styled from "styled-components";
import { FaCocktail } from "react-icons/fa";
import KakaoMap from "../cocktailbar/KakaoMap";
import { useParams } from "react-router-dom";
import MapSideInfo from "../cocktailbar/MapSideInfo";

const HomeBar = () => {
  const params = useParams();

  return (
    <Section>
      <HomeTitleBox>
        <FaCocktail className="logo"></FaCocktail>
        <p>내 주변 칵테일 바</p>
      </HomeTitleBox>
      <Wrapper>
        <div className="wrapper">
          <KakaoMap id={params.id} />
          <MapSideInfo id={params.id} />
        </div>
      </Wrapper>
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
    color: ${({ theme }) => theme.color.primaryGold};
    margin-right: 0.75rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  height: 30rem;
  .wrapper {
    display: flex;
    height: 100%;
  }
  @media screen and (max-width: 920px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .wrapper {
      display: block;
      flex-grow: 1;
      position: relative;
      overflow: hidden;
    }
  }
  @media screen and (max-width: 840px) {
    padding-top: 0;
  }
`;

export default HomeBar;
