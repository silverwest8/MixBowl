import { Link, useHref } from "react-router-dom";
import styled from "styled-components";

const NAV = [
  {
    to: "/recipe",
    name: "칵테일 레시피",
  },
  {
    to: "/community",
    name: "커뮤니티",
  },
  {
    to: "/cocktailbar",
    name: "칵테일 바 지도",
  },
];

const Nav = () => {
  const href = useHref();
  return (
    <NavBox>
      {NAV.map(({ to, name, login }) => (
        <StyledLink
          to={to}
          key={to}
          className={href.includes(to) ? "active" : ""}
        >
          {href.includes(to) && (
            <>
              <img src="/images/light_bulb.png" />
              <span></span>
            </>
          )}
          {name}
        </StyledLink>
      ))}
    </NavBox>
  );
};

const NavBox = styled.nav`
  display: flex;
  gap: 6.75rem;
  align-items: flex-end;
  padding: 0 2.25rem;
  border-bottom: 3px solid ${({ theme }) => theme.color.primaryGold};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 920px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
    border-bottom: none;
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  padding: 1.5rem 0 0.6rem;
  font-size: 1rem;
  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border-bottom: 75px solid rgba(221, 186, 0, 0.2);
    border-left: 70px solid transparent;
    border-right: 70px solid transparent;
    filter: blur(2px);
    transform: translateX(-50%);
  }
  img {
    position: absolute;
    top: -4px;
    left: 50%;
    width: 40px;
    height: 20px;
    object-fit: contain;
    transform: translateX(-50%);
  }
  &.active {
    color: ${({ theme }) => theme.color.primaryGold};
    font-weight: 700;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 920px) {
    padding: 0.75rem 0;
    img {
      display: none;
    }
    span {
      display: none;
    }
  }
`;

export default Nav;
