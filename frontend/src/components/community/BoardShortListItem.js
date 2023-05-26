import styled from "styled-components";
import { FaCommentDots } from "react-icons/fa";

const BoardShortListItem = ({ data }) => {
  return (
    <ItemContainer>
      <div>{data.CATEGORY === 2 ? data.CONTENT : data.TITLE}</div>
      <div>
        <FaCommentDots className="icon" />
        {data.REPLY}
      </div>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  font-size: 0.875rem;
  width: 100%;
  > div:first-child {
    width: 12vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1rem;
    @media screen and (max-width: 800px) {
      width: 40vw;
    }
    @media screen and (max-width: 500px) {
      width: 50vw;
    }
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    width: 3rem;
  }
`;

export default BoardShortListItem;
