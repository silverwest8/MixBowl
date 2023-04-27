import styled from "styled-components";
import { FaCommentDots, FaThumbsUp } from "react-icons/fa";
import MemberBadge from "./MemberBadge";
// import { useEffect } from "react";

const FreeListItem = ({ data }) => {
  // TODO : 호버, 글 종류별로 변경
  return (
    <ItemContainer>
      <TopSection>
        <div>
          <h4>{data.title}</h4>
        </div>
        <div className="category">{data.category}</div>
      </TopSection>
      <MainText className={data.category === "질문과 답변" ? "question" : ""}>
        {data.maintext}
      </MainText>
      <BottomSection>
        <ReactionContainer>
          <FaThumbsUp className={data.liked ? "icon liked" : "icon"} />
          {data.likes}
          <FaCommentDots className="icon comment" />
          {data.comments}
        </ReactionContainer>
        <div className="userinfo">
          {data.date}
          <span className="username">{data.username}</span>
          <MemberBadge level={data.userlevel} />
        </div>
      </BottomSection>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 8px;
  padding: 0.8rem 0.2rem;
  /* width: 50rem; */
  button {
    color: ${({ theme }) => theme.color.primaryGold};
    text-decoration: underline;
    flex-shrink: 0;
  }
  font-size: 0.875rem;
  .question {
    font-weight: bold;
    font-size: 1.125rem;
    -webkit-line-clamp: 2;
    height: 3.5rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 35vw;
    font-weight: bold;
    font-size: 1.125rem;
  }
  .category {
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;
const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.2rem 0.9rem;
  .userinfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .username {
      margin: 0 0.3rem 0 0.5rem;
      @media screen and (max-width: 400px) {
        display: none;
      }
    }
    > div {
      @media screen and (max-width: 400px) {
        display: none;
      }
    }
  }
`;
const ReactionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
  .icon {
    margin-right: 0.2rem;
  }
  .liked {
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .comment {
    margin-left: 0.7rem;
  }
`;

const MainText = styled.div`
  padding: 1rem;
  /* padding-bottom: 2rem; */
  margin: 0.2rem 0 1rem 0;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4rem;
`;

export default FreeListItem;
