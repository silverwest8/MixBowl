import styled from "styled-components";
import { FaCommentDots, FaThumbsUp } from "react-icons/fa";
import { BiHeartCircle } from "react-icons/bi";
import MemberBadge from "../common/MemberBadge";
import { Link } from "react-router-dom";

const FreeListItem = ({ data }) => {
  // TODO : 호버, 이미지처리
  return (
    <ItemContainer to={`/community/${data.id}`}>
      <TopSection>
        <div>
          <span>
            {data.recommended === true ? (
              <BiHeartCircle className="recommend icon" />
            ) : (
              ""
            )}
          </span>
          <h4>{data.title}</h4>
        </div>
        <div className="category">
          {data.category === "qna"
            ? "질문과 답변"
            : data.category === "free"
            ? "자유 게시글"
            : data.category === "review"
            ? "칵테일 리뷰"
            : data.category === "recommendation"
            ? "칵테일 추천"
            : ""}
        </div>
      </TopSection>
      <MainText className={data.category === "qna" ? "question" : ""}>
        {data.maintext}
      </MainText>
      <BottomSection>
        <ReactionContainer>
          <FaThumbsUp className={data.liked ? "icon liked" : "icon"} />
          {data.likes}
          <FaCommentDots className="icon comment" />
          <span className="shown">
            {data.category === "qna" && data.comments === 0
              ? "지금 답변을 기다리고 있어요"
              : data.comments}
          </span>
          <span className="hidden">
            {data.category === "qna" && data.comments === 0
              ? "답변 필요"
              : data.comments}
          </span>
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

const ItemContainer = styled(Link)`
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
  > div {
    display: flex;
    align-items: center;
    > span {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 35vw;
    font-weight: bold;
    font-size: 1.125rem;
    @media screen and (max-width: 500px) {
      width: 50vw;
    }
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
    }
  }
`;
const ReactionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.gray};
  .icon {
    margin-right: 0.2rem;
  }
  .liked {
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .comment {
    margin-left: 0.7rem;
  }
  .hidden {
    display: none;
  }
  @media screen and (max-width: 400px) {
    .shown {
      display: none;
    }
    .hidden {
      display: inline;
    }
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
