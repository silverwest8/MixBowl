import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import KakaoMap from "../components/cocktailbar/KakaoMap";
import Title from "../components/common/Title";
import MapSideInfo from "../components/cocktailbar/MapSideInfo";

const CocktailBarPage = () => {
  const params = useParams();
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <Main>
      <Title title="칵테일 바 지도" />
      <div className="wrapper">
        <KakaoMap id={params.id} />
        <MapSideInfo id={params.id} />
      </div>
    </Main>
  );
};

const Main = styled.main`
  padding: 2rem 1rem;
  height: calc(calc(var(--vh, 1vh) * 100) - 3.5rem);
  .wrapper {
    display: grid;
    grid-template-columns: 3fr 1.2fr;
    gap: 2rem;
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

export default CocktailBarPage;
