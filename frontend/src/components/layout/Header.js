import { Link, useHref } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Nav from "./Nav";
import AuthButtonBox from "./AuthButtonBox";
import styled from "styled-components";
import { useEffect, useState } from "react";
import OnClickOutside from "../common/OnClickOutside";

const Header = () => {
  const [show, setShow] = useState(false);
  const href = useHref();
  useEffect(() => {
    setShow(false);
  }, [href]);
  return (
    <>
      <OnClickOutside trigger={() => setShow(false)}>
        <HeaderBox>
          <div>
            <div className="mobile-header-center">
              <Link to="/" className="logo-link">
                <img
                  src="/images/logo.png"
                  className="logo-image"
                  alt="Cocktell logo"
                />
              </Link>
              <button
                className="nav-button"
                onClick={() => setShow((show) => !show)}
              >
                <FaBars />
              </button>
            </div>
            <NavWrapper show={show}>
              <div>
                <Nav />
              </div>
              <AuthButtonBox />
            </NavWrapper>
          </div>
        </HeaderBox>
      </OnClickOutside>
      <Spacer />
    </>
  );
};

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  height: 3.375rem;
  margin: 0 auto;
  z-index: 100;
  background-color: ${({ theme }) => theme.color.black};
  & > div {
    display: flex;
    align-items: center;
    max-width: 1296px;
    width: 100%;
    height: 100%;
  }
  h1 {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
  .logo-image {
    width: 10rem;
  }
  .nav-button {
    display: none;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .mobile-header-center {
    height: 100%;
    width: 180px;
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
  }
  .logo-link {
    display: flex;
    align-items: center;
    height: 100%;
    padding-top: 0.5rem;
  }
  @media screen and (max-width: 1296px) {
    padding: 0 1rem;
  }
  @media screen and (max-width: 920px) {
    padding: 0;
    align-items: center;
    height: auto;
    & > div {
      display: flex;
      flex-direction: column;
    }
    .logo-link {
      padding-top: 0;
    }
    .mobile-header-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1rem;
    }
    .nav-button {
      display: block;
    }
  }
`;

const NavWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: baseline;
  width: 100%;
  height: 100%;
  background-color: inherit;
  & > div:first-child {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 920px) {
    display: ${({ show }) => (show ? "flex" : "none")};
    flex-direction: column;
    border-bottom: 2px solid ${({ theme }) => theme.color.primaryGold};
    & > div:first-child {
      width: 100%;
    }
  }
`;

const Spacer = styled.div`
  height: 3.375rem;
  @media screen and (max-width: 920px) {
    height: 4.375rem;
  }
`;

export default Header;
