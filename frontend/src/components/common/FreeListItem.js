import styled from "styled-components";
import { FaCommentDots, FaThumbsUp } from "react-icons/fa";

const FreeListItem = ({ data }) => {
  console.log("data is ", data);
  // TODO : 색깔, 뱃지, 크기, 호버, 극단적 경우 처리
  return (
    <ItemContainer>
      <TopSection>
        <div>
          <h2>{data.title}</h2>
        </div>
        <div>{data.category}</div>
      </TopSection>
      <MainText>{data.maintext}</MainText>
      <BottomSection>
        <ReactionContainer>
          <FaThumbsUp className="icon" />
          {data.likes}
          <FaCommentDots className="icon comment" />
          {data.comments}
        </ReactionContainer>
        <div>
          {/* {data.date} */}
          {data.username}
        </div>
      </BottomSection>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 8px;
  padding: 0.8rem 0.95rem;
  button {
    color: ${({ theme }) => theme.color.primaryGold};
    text-decoration: underline;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;
const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.2rem 0.9rem;
`;
const ReactionContainer = styled.div`
  display: flex;
  flex-direction: row;
  .icon {
    margin-right: 0.5rem;
  }
  .comment {
    margin-left: 1.2rem;
  }
`;

const MainText = styled.div`
  padding: 2rem;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0.125rem;

  &.success {
    color: ${({ theme }) => theme.color.green};
  }
  &.error {
    color: ${({ theme }) => theme.color.red};
  }
`;

export default FreeListItem;
