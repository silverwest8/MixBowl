import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import KakaoMap from "../components/cocktailbar/KakaoMap";
import Title from "../components/common/Title";
import MapSideInfo from "../components/cocktailbar/MapSideInfo";
import { useRecoilValue } from "recoil";
import { authState } from "../store/auth";

const CocktailBarPage = () => {
  const params = useParams();
  const { isLoggedin } = useRecoilValue(authState);
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return isLoggedin ? (
    <Main>
      <Title title="칵테일 바 지도" />
      <div className="wrapper">
        <KakaoMap id={params.id} />
        <MapSideInfo id={params.id} />
      </div>
    </Main>
  ) : (
    <Navigate replace to="/login?return_url=/cocktailbar" />
  );
};

const Main = styled.main`
  padding: 2rem 1rem;
  height: calc(calc(var(--vh, 1vh) * 100) - 3.5rem);
  .wrapper {
    display: flex;
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
