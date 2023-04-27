import { FaCocktail } from "react-icons/fa";
import styled from "styled-components";

const MemberBadge = ({ level }) => {
  return (
    <Circle level={level}>
      <FaCocktail />
    </Circle>
  );
};

export default MemberBadge;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  font-size: 0.6rem;
  background-color: ${({ theme, level }) =>
    level === 1
      ? theme.color.lightGray
      : level === 2
      ? theme.color.green
      : level === 3
      ? theme.color.secondGold
      : theme.color.red};
`;
