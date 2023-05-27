import styled from "styled-components";
import FreeListItem from "../components/community/FreeListItem";
import { Link } from "react-router-dom";
import Title from "../components/common/Title";
import { useModal } from "../hooks/useModal";
import CommentItem from "../components/mypage/CommentItem";
import { FaPen, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import MemberBadge from "../components/common/MemberBadge";
import WithdrawModal from "../components/mypage/WithdrawModal";
import { useEffect, useState } from "react";
import ReviewItem from "../components/mypage/ReviewItem";
import LevelInfoModal from "../components/mypage/LevelInfoModal";
import NameChangeModal from "../components/mypage/NameChangeModal";
import VerifyingModal from "../components/mypage/VerifyingModal";
import axios from "axios";

const dummyData = {
  uname: "유저123",
  level: 1,
  recipes: [
    {
      rno: 0,
      image_path:
        "https://cdn.discordapp.com/attachments/1103197507678392321/1103197535184633856/image.png",
      name: "Old Fashioned",
      uname: "user098",
      level: 3,
      liked: true,
      comment: 10,
      like: 3,
    },
    {
      rno: 1,
      image_path:
        "https://cdn.discordapp.com/attachments/1103197507678392321/1103197535184633856/image.png",
      name: "제목 길이제한 테스트 제목이 엄청 길어진다면 어떻게 될 것인지 확인해봅시다",
      uname: "user098",
      level: 3,
      liked: true,
      like: 3,
    },
  ],
  postings: [
    {
      id: 0,
      title: "example title",
      category: "recommendation",
      uname: "유저123",
      level: 1,
      likes: 32,
      comments: 9,
      date: "3일 전",
      maintext: "칵테일 추천글을 썼다고 가정했을 때입니다.",
    },
    {
      id: 1,
      title: "두 번째 제목 예시",
      category: "free",
      uname: "username10",
      level: 1,
      likes: 0,
      comments: 100,
      date: "5일 전",
      // TODO : 나중에는 date 타입으로 받아올것
      maintext:
        "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
    },
    {
      id: 2,
      category: "qna",
      uname: "username10",
      level: 1,
      likes: 10,
      comments: 8,
      date: "9일 전",
      // TODO : 나중에는 date 타입으로 받아올것
      maintext:
        "이번엔 질문글입니다. 세 개까지만 보여줄 것이므로, 이 아래로는 게시글이 보이지 않아야 합니다. 내가 쓴 게시글 옆 화살표를 누르면 전체 게시글이 보일 것입니다.",
    },
    {
      id: 3,
      title: "칵테일 추천글입니다",
      category: "recommendation",
      uname: "username10",
      level: 1,
      likes: 1,
      comments: 4,
      date: "5달 전",
      // TODO : 나중에는 date 타입으로 받아올것
      maintext:
        "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
    },
  ],
  comments: [
    {
      id: 0,
      username: "댓글이름",
      date: "1일 전",
      userlevel: 2,
      content: "댓글 예시는 이런 식으로",
      title: "원글 제목은 아래에 표시",
      titleid: 3,
    },
    {
      id: 1,
      username: "namelikeit",
      date: "1시간 전",
      userlevel: 3,
      title:
        "what if the title is really, like, insanely long? it has to be ellipsis. You gotta do it, right, now.",
      content:
        "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      titleid: 4,
    },
  ],
  reviews: [
    {
      id: 0,
      keyword: ["혼술하기 좋아요", "술이 다양해요", "분위기가 좋아요"],
      content:
        "칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. 칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. 칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. 칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. 칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. 칵테일 바 리뷰 내용은 다음과 같습니다. 길어질 경우. ",
      placeId: 3124,
      placeName: "칵테일 바 이름",
    },
  ],
};

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 10rem;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 4rem;
  > div:first-child {
    display: flex;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
    > span:first-child {
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  > span {
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .icon {
    margin-left: 1rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  @media screen and (max-width: 800px) {
    align-items: end;
    .down {
      margin-bottom: 0.2rem;
    }
  }
`;
const NoContent = styled.div`
  width: 100%;
  height: 20vh;
  color: ${({ theme }) => theme.color.primaryGold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
  @media screen and (max-width: 500px) {
    width: 85vw;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  p {
    display: flex;
    align-items: center;
  }
`;

const RecipeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-items: center;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  max-height: 18rem;

  @media screen and (max-width: 928px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 350px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RecipeBox = styled.div`
  width: 12.5rem;
  img {
    height: 12.5rem;
    width: 100%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 0.75rem;
  }
  h1 {
    font-size: 1.25rem;
    margin-top: 0.5rem;
  }
  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    gap: 0.2rem;
  }
  .ThumbsUp {
    display: flex;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .Comment {
    display: flex;
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.primaryGold};
  color: black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  min-width: 10vw;
  margin: 0rem 1rem 0.5rem 0;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
  > span {
    margin-left: 0.2rem;
    font-size: 0.9rem;
  }
`;
const WithdrawalButton = styled.button`
  color: white;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
`;

const LevelSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    > span {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      .icon {
        margin-left: 0.5rem;
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
  > div:last-child {
    margin-top: 0.7rem;
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
    > span:first-child {
      font-size: 1.5rem;
      margin-right: 1rem;
      color: white;
    }
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  > div:first-child {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 1rem;
    }
  }
  > div:last-child {
    margin-top: 1rem;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
  justify-content: right;
`;

const MyPage = () => {
  const { openModal, closeModal } = useModal();
  const [userInfo, setUserInfo] = useState({
    NICKNAME: "기본 유저",
    LEVEL: 1,
  });
  const [recipe, setRecipe] = useState([]);
  const [postings, setPostings] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("access_token");

  const [dataFetched, setDataFetched] = useState(false);
  let name = "";
  const fetchData = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;

      // Fetch data only if it hasn't been fetched before
      if (!dataFetched) {
        const userInfoResponse = await axios.get(`/api/users`);
        const recipeResponse = await axios.get(`/api/mypages/recipes/1`);
        const postingsResponse = await axios.get(`/api/mypages/posts/1`);
        const commentsResponse = await axios.get(`/api/mypages/replies/1`);
        const reviewsResponse = await axios.get(`/api/mypages/reviews/1`);

        setUserInfo(userInfoResponse.data.data);
        setRecipe(recipeResponse.data.list);
        setPostings(postingsResponse.data.list);
        setComments(commentsResponse.data.list);
        setReviews(reviewsResponse.data.list);

        setDataFetched(true); // Set the flag to indicate that data has been fetched
        name = userInfo.NICKNAME;
      }
    } catch (error) {
      console.log("empty or error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Title title="커뮤니티" />
      <Background>
        <MainWrapper>
          <TopSection>
            <div>
              <span>{userInfo.NICKNAME}</span>
              <span>님의 마이페이지</span>
            </div>
            <FaPen
              className="icon down"
              onClick={() => {
                openModal(NameChangeModal, {
                  handleClose: closeModal,
                  name,
                });
              }}
            />
          </TopSection>
          <LevelSection>
            <div>
              <span>
                등급 관리
                <BsInfoCircleFill
                  className="icon"
                  onClick={() => {
                    openModal(LevelInfoModal, {
                      handleClose: closeModal,
                    });
                  }}
                />
              </span>
              <Button
                onClick={() => {
                  openModal(VerifyingModal, {
                    handleClose: closeModal,
                  });
                }}
              >
                <AiFillCamera />
                <span>전문가 인증하기</span>
              </Button>
            </div>
            <div>
              <span>{userInfo.LEVEL}단계</span>
              <span>
                {userInfo.LEVEL === 1
                  ? "Cocktell에 가입한 회원"
                  : userInfo.LEVEL === 2
                  ? "일주일 3회 이상 방문, 게시글 10개 이상 작성"
                  : userInfo.LEVEL === 3
                  ? "게시글 30개 이상 작성"
                  : "조주기능사 자격증 소지자, 칵테일 관련 사업자"}
              </span>
            </div>
          </LevelSection>
          <Section>
            <div>
              내가 추천한 레시피
              <MdArrowForwardIos className="icon" />
            </div>
            <div>
              {recipe && recipe.length === 0 ? (
                <NoContent>추천하신 레시피가 없습니다</NoContent>
              ) : (
                <RecipeWrapper>
                  {recipe?.map((index) => (
                    <RecipeBox key={index.cocktailId}>
                      <Link to={`/recipe/${index.cocktailId}`}>
                        <img
                          src={"/api/recipes/image/" + index.cocktailId}
                        ></img>
                        <h1>{index.name}</h1>
                      </Link>
                      <TextBox>
                        <p>
                          @{index.USER.nickname}{" "}
                          <MemberBadge level={index.USER.level} />
                        </p>
                        <div>
                          <p className="ThumbsUp">
                            <FaThumbsUp></FaThumbsUp>
                            {index.like}
                          </p>
                          <p className="Comment">
                            <FaCommentDots></FaCommentDots>
                            {index.comment ? index.comment : 0}
                          </p>
                        </div>
                      </TextBox>
                    </RecipeBox>
                  ))}
                </RecipeWrapper>
              )}
            </div>
          </Section>
          <Section>
            <div>
              내가 쓴 게시글
              <MdArrowForwardIos className="icon" />
            </div>
            <div>
              {postings.length === 0 ? (
                <NoContent>작성하신 게시물이 없습니다</NoContent>
              ) : (
                postings
                  .slice(0, 3)
                  ?.map((el) => <FreeListItem key={el.postId} data={el} />)
              )}
            </div>
          </Section>
          <Section>
            <div>
              내가 쓴 댓글
              <MdArrowForwardIos className="icon" />
            </div>
            <div>
              {comments.length === 0 ? (
                <NoContent>작성하신 댓글이 없습니다</NoContent>
              ) : (
                comments
                  .slice(0, 3)
                  ?.map((el) => <CommentItem key={el.replyId} data={el} />)
              )}
            </div>
          </Section>
          <Section>
            <div>
              내가 쓴 칵테일 바 리뷰
              <MdArrowForwardIos className="icon" />
            </div>
            <div>
              {reviews.length === 0 ? (
                <NoContent>작성하신 리뷰가 없습니다</NoContent>
              ) : (
                reviews
                  .slice(0, 3)
                  ?.map((el) => <ReviewItem key={el.reviewId} data={el} />)
              )}
            </div>
          </Section>
          <ButtonContainer>
            <WithdrawalButton
              onClick={() => {
                openModal(WithdrawModal, {
                  handleClose: closeModal,
                });
              }}
            >
              회원 탈퇴
            </WithdrawalButton>
          </ButtonContainer>
        </MainWrapper>
      </Background>
    </main>
  );
};

export default MyPage;
