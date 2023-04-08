import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import Nav from "./Nav";
import AuthButtonBox from "./AuthButtonBox";

const Layout = () => {
  return (
    <>
      <HeaderBox>
        <div>
          <h1>
            <Link to="/">LOGO</Link>
          </h1>
          <Nav />
          <AuthButtonBox />
        </div>
      </HeaderBox>
      <Outlet />
    </>
  );
};

const HeaderBox = styled.header`
  display: flex;
  justify-content: center;
  max-width: 1296px;
  width: 100%;
  margin: 0 auto;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  }
  h1 {
    width: 10%;
  }
`;

export default Layout;
