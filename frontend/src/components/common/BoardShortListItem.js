import styled from "styled-components";
import { FaCommentDots } from "react-icons/fa";

const BoardShortListItem = ({ data }) => {
  console.log("data is ", data);
  return (
    <ItemContainer>
      <div>{data.title}</div>
      <div>
        <FaCommentDots className="icon" />
        {data.comments}
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
      width: 30vw;
    }
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    width: 3rem;
  }
`;

export default BoardShortListItem;
