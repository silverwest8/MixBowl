import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { useRef, useState } from "react";
import CocktailbarList from "./CocktailbarList";
import CocktailbarDetail from "./CocktailbarDetail";

const MapSideInfo = ({ id }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  return (
    <Wrapper show={show}>
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

  flex-shrink: 0;
  & > button {
    display: none;
  }
  @media screen and (max-width: 920px) {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    overflow-y: auto;
    flex-shrink: 0;
    transform: ${({ show }) => !show && `translateX(18rem)`};
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
  width: 18rem;
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
