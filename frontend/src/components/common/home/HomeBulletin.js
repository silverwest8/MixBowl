import styled from "styled-components";
import { FaHotjar } from "react-icons/fa";

const HomeTitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  .logo {
    color: ${({ theme, num }) =>
      num === 1
        ? theme.color.lightGray
        : num === 2
        ? theme.color.primaryGold
        : num === 3
        ? theme.color.red
        : null};
    margin-right: 0.75rem;
  }
  p {
    text-size: 1.5rem;
    font-weight: bold;
  }
`;

const HomeBulletin = ({ num }) => {
  return (
    <>
      <HomeTitleBox num={num}>
        <FaHotjar className="logo"></FaHotjar>
        <p>이번주 커뮤니티 인기글</p>
      </HomeTitleBox>
    </>
  );
};

export default HomeBulletin;
