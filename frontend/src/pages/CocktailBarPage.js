import { useEffect } from "react";
import styled from "styled-components";
import KakaoMap from "../components/cocktailbar/KakaoMap";
import Title from "../components/common/Title";

const CocktailBarPage = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <Main>
      <Title title="칵테일 바 지도" />
      <KakaoMap />
      <div></div>
    </Main>
  );
};

const Main = styled.main`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  padding: 2rem 1rem;
  height: calc(calc(var(--vh, 1vh) * 100) - 3.5rem);
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    padding-top: 0;
  }
`;

export default CocktailBarPage;
