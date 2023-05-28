import styled from "styled-components";
import { FaCommentDots, FaThumbsUp } from "react-icons/fa";
import { BiHeartCircle } from "react-icons/bi";
import MemberBadge from "../common/MemberBadge";
import { Link } from "react-router-dom";

const ImageSection = styled.div`
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  width: 6rem;
  height: 6rem;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem;
`;

const HotListItem = ({ data }) => {
  // TODO : 호버, 이미지처리
  // console.log(`${data.TITLE}의 카테고리는 ${data.CATEGORY}`);
  // 아직 없는 필드들 많음. 추가되면 그 데이터 형식에 맞춰서 바꾸기.

  console.log("hot is ", data);
  return (
    <ItemContainer to={`/community/${data.PNO}`}>
      <div className="wrapper">
        <div>
          <TopSection>
            <div>
              <span>
                {data.CATEGORY === 3 && data.cocktailLike !== null ? (
                  <BiHeartCircle className="recommend icon" />
                ) : (
                  ""
                )}
              </span>
              <h4>{data.TITLE}</h4>
            </div>
            <div className="CATEGORY">
              {data.CATEGORY === 2
                ? "질문과 답변"
                : data.CATEGORY === 4
                ? "자유 게시글"
                : data.CATEGORY === 3
                ? "칵테일 리뷰"
                : data.CATEGORY === 1
                ? "칵테일 추천"
                : ""}
            </div>
          </TopSection>
          <MainText className={data.CATEGORY === 2 ? "question" : ""}>
            {data.CONTENT}
          </MainText>
          <BottomSection>
            <ReactionContainer>
              <FaThumbsUp className={data.isUserLike ? "icon liked" : "icon"} />
              {data.LIKE}
              <FaCommentDots className="icon comment" />
              <span className="shown">
                {data.CATEGORY === 2 && data.REPLY === 0
                  ? "지금 답변을 기다리고 있어요"
                  : data.REPLY}
              </span>
              <span className="hidden">
                {data.CATEGORY === 2 && data.REPLY === 0
                  ? "답변 필요"
                  : data.REPLY}
              </span>
            </ReactionContainer>
            <div className="userinfo">
              {data.createdAt.slice(5, 10)}
              <span className="username">{data.UNO_USER.NICKNAME}</span>
              <MemberBadge level={data.UNO_USER.LEVEL} />
            </div>
          </BottomSection>
        </div>
        {data.CNO ? (
          <ImageSection>
            <img src={`/api/recipes/image/${data.CNO}`}></img>
          </ImageSection>
        ) : (
          data.imageId !== 0 &&
          data.imageId !== undefined &&
          data.imageId !== null && (
            <ImageSection>
              <img
                src={`${process.env.REACT_APP_BACKEND_BASE_URL}communities/one/image?imageId=${data.imageId}`}
              />
            </ImageSection>
          )
        )}
      </div>
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
  .wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    > div:first-child {
      width: 100%;
    }
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
  .CATEGORY {
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

export default HotListItem;