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
    position: relative;
    display: flex;
    height: 100%;
  }
  @media screen and (max-width: 940px) {
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .wrapper {
      display: block;
      flex-grow: 1;
      overflow: hidden;
    }
  }
`;

export default CocktailBarPage;
