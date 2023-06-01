import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTimeForToday } from "../../utils/date";

const CommentItem = ({ data }) => {
  return (
    <ItemContainer>
      <ItemWrapper to={`/community/${data.postId}`}>
        <p>{data.content}</p>
        <div>
          <DateContainer>{data.title}</DateContainer>
          <DateContainer>{getTimeForToday(data.date)}</DateContainer>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  width: 100%;
  list-style: none;
`;
const ItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.darkGray};
  > p {
    width: 100%;
  }
  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const DateContainer = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.gray};
`;
export default CommentItem;
