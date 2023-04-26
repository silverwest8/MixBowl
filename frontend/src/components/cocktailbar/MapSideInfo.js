import { useRecoilValue } from "recoil";
import { mapState } from "../../store/map";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CocktailbarList from "./CocktailbarList";
import CocktailbarDetail from "./CocktailbarDetail";

const MapSideInfo = ({ id }) => {
  const { data } = useRecoilValue(mapState);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  const onChangeWidth = () => {
    setWidth(ref.current.offsetWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", onChangeWidth);
    return () => {
      window.removeEventListener("resize", onChangeWidth);
    };
  }, []);
  useEffect(() => {
    onChangeWidth();
  }, [ref, data]);
  return (
    <Wrapper show={show} width={width}>
      <button onClick={() => setShow((state) => !state)}>
        {show ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <InfoWrapper ref={ref}>
        {id ? <CocktailbarDetail id={id} /> : <CocktailbarList />}
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: scroll;
  & > button {
    display: none;
  }
  @media screen and (max-width: 920px) {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    overflow-y: auto;
    transform: ${({ show, width }) => !show && `translateX(${width}px)`};
    & > button {
      display: block;
      align-self: center;
      padding: 1rem 0.3rem;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      background-color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.darkGray};
  }
`;

const InfoWrapper = styled.div`
  padding: 0 0.5rem;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.black};
  }
  @media screen and (max-width: 920px) {
    overflow-y: scroll;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export default MapSideInfo;
