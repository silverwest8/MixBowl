import styled from "styled-components";
import { FaWeixin } from "react-icons/fa";

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

const HomeAnswer = ({ num }) => {
  return (
    <HomeTitleBox num={num}>
      <FaWeixin className="logo"></FaWeixin>
      <p>지금 당신의 답변을 기다리고 있어요</p>
    </HomeTitleBox>
  );
};

export default HomeAnswer;
