// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Title from "../components/common/Title";
import { FaThumbsUp } from "react-icons/fa";
import MemberBadge from "../components/common/MemberBadge";
import DropdownMenu from "../components/common/DropdownMenu";
import { MdArrowBackIosNew } from "react-icons/md";
import Textarea from "../components/common/Textarea";
import CommentItem from "../components/community/CommentItem";
import AnswerItem from "../components/community/AnswerItem";
import ReportModal from "../components/common/ReportModal";
import { useModal } from "../hooks/useModal";
import { toastState } from "../store/toast";
import { useSetRecoilState } from "recoil";

const postData = [
  {
    // TODO: 이미지 처리
    id: 0,
    title:
      "제목 예시입니다. 만약 제목 길이가 아주 길다면 어떻게 될지 한 번 보도록 하겠습니다. 이런 식으로 길어진다면 글자수 제한을 해야 되겠죠.",
    category: "free",
    username: "user01",
    userlevel: 3,
    liked: true,
    likes: 16,
    comments: [
      {
        id: 0,
        username: "댓글이름",
        date: "1일 전",
        userlevel: 2,
        content: "댓글 예시는 이런 식으로",
      },
      {
        id: 1,
        username: "namelikeit",
        date: "1시간 전",
        userlevel: 3,
        content:
          "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      },
    ],
    date: "1일 전",
    content: "본문 예시입니다. 짧을 경우.",
  },
  {
    id: 1,
    title: "두 번째 제목 예시",
    category: "free",
    username: "username10",
    userlevel: 2,
    likes: 0,
    comments: [],
    date: "5일 전",
    // TODO : 나중에는 date 타입으로 받아올것
    content:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 2,
    title: "",
    content:
      "질문글 예시입니다. 이런식으로 질문이 bold체로 다 들어가야 되겠죠. 질문의 경우 title이 길어지는 것으로 할까요 아니면 본문을 굵게 표현하는 것으로 할까요?",
    category: "qna",
    username: "한글닉네임열글자라면",
    userlevel: 1,
    liked: true,
    likes: 1,
    comments: [
      {
        id: 0,
        username: "댓글이름",
        date: "1일 전",
        userlevel: 2,
        content: "댓글 예시는 이런 식으로",
      },
      {
        id: 1,
        username: "namelikeit",
        date: "1시간 전",
        userlevel: 3,
        content:
          "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      },
    ],
    date: "2일 전",
  },
  {
    id: 3,
    title: "칵테일 추천글 예시",
    category: "recommendation",
    username: "recommend",
    userlevel: 4,
    likes: 3,
    recommended: false,
    liked: false,
    date: "5달 전",
    comments: [
      {
        id: 0,
        username: "댓글이름",
        date: "1일 전",
        userlevel: 2,
        content: "댓글 예시는 이런 식으로",
      },
      {
        id: 1,
        username: "namelikeit",
        date: "1시간 전",
        userlevel: 3,
        content:
          "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      },
    ],
    content:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 4,
    title: "칵테일 리뷰 예시",
    category: "review",
    username: "recommend",
    userlevel: 4,
    likes: 3,
    liked: false,
    comments: [
      {
        id: 0,
        username: "댓글이름",
        date: "1일 전",
        userlevel: 2,
        content: "댓글 예시는 이런 식으로",
      },
      {
        id: 1,
        username: "namelikeit",
        date: "1시간 전",
        userlevel: 3,
        content:
          "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      },
    ],
    date: "1년 전",
    content:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 5,
    // qna는 title 입력값을 아예 안 받을 것인지?
    content:
      "질문글 예시입니다. 답변이 있을 때와 없을 떄에 따라서 상단에 표시되는지가 달라질 것입니다",
    category: "qna",
    username: "한글",
    userlevel: 1,
    liked: true,
    likes: 0,
    comments: [
      {
        id: 0,
        username: "댓글이름",
        date: "1일 전",
        userlevel: 2,
        content: "댓글 예시는 이런 식으로",
      },
      {
        id: 1,
        username: "namelikeit",
        date: "1시간 전",
        userlevel: 3,
        content:
          "댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. 댓글이 아주 길어진다면 이런 식으로 작성됩니다. ",
      },
    ],
    date: "2일 전",
  },
  {
    id: 6,
    title: "칵테일 리뷰 예시",
    category: "review",
    username: "recommend",
    recommended: true,
    userlevel: 4,
    likes: 3,
    comments: 2,
    date: "1년 전",
    content:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
];

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 10rem;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
    font-size: 1.5rem;
    &:hover {
      color: ${({ theme }) => theme.color.primaryGold};
      cursor: pointer;
    }
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const EntireSection = styled.div`
  width: 45vw;
  @media screen and (max-width: 500px) {
    width: 60vw;
  }
  @media screen and (max-width: 800px) {
    width: 83vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  .none {
    display: none;
  }
`;
const ReportButton = styled.div`
  flex: 1 0 auto;
  margin-left: 1rem;
  padding: 0.2rem 1rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 5px;
  font-size: 0.75rem;
  max-height: 1.5rem;
  max-width: 3.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

const TopMost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: color-interpolation-filters;
  > span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

const Username = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  > span {
    margin-right: 0.5rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  > div:first-child {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
  > hr {
    color: ${({ theme }) => theme.color.primaryGold};
    margin-top: 1rem;
  }
`;
const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: end;
    .liked {
      color: ${({ theme }) => theme.color.primaryGold};
      &:hover {
        color: ${({ theme }) => theme.color.secondGold};
      }
    }
  }
`;
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  > ul {
    margin-top: 2rem;
  }
  > div:first-child {
    > div {
      display: flex;
      align-items: end;
    }
  }
`;
const CommentButton = styled.div`
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
  cursor: pointer;
`;
const CommunityPostDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { openModal, closeModal } = useModal();

  const GetPost = async () => {
    try {
      setPost(postData[id]);
      setLiked(postData[id].liked);
      setLikeCount(postData[id].likes);
    } catch (error) {
      return error.message;
    }
  };

  const [comment, setComment] = useState("");
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };
  const registerComment = () => {
    console.log("comment is ", comment);
    console.log(post.comments);
    post.comments.push({
      id: 3,
      username: "namelikeit",
      date: "1시간 전",
      userlevel: 3,
      content: comment,
    });
  };
  const changeLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
    console.log("like is ", liked);
  };
  const setToastState = useSetRecoilState(toastState);
  const submitReport = () => {
    // TODO
    // report 수 증가?
    setTimeout(() => {
      setToastState({
        show: true,
        message: "신고가 완료되었습니다.",
        type: "success",
        ms: 1000,
      });
    }, 300);
    closeModal();
  };

  useEffect(() => {
    GetPost();
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
        <EntireSection>
          <TopSection>
            <TopMost>
              <Link to={"/community/board?category=all"}>
                <MdArrowBackIosNew className="icon" />
              </Link>
              <span>
                {post.category === "qna"
                  ? "질문과 답변"
                  : post.category === "free"
                  ? "자유 게시글"
                  : post.category === "review"
                  ? "칵테일 리뷰"
                  : post.category === "recommendation"
                  ? "칵테일 추천"
                  : ""}
              </span>
            </TopMost>
            <Username>
              <span>{post.username}</span>
              <MemberBadge level={post.userlevel} />
            </Username>
            <TitleContainer className={post.category === "qna" ? "none" : ""}>
              <span>{post.title}</span>
              {/* TODO: 로그인 시 달라지게, 지금은 임시로 넣어둠 */}
              {post.content ? (
                <ReportButton
                  onClick={() =>
                    openModal(ReportModal, {
                      handleClose: closeModal,
                      onSubmit: submitReport,
                    })
                  }
                >
                  신고
                </ReportButton>
              ) : (
                <DropdownMenu />
              )}
            </TitleContainer>
          </TopSection>
          <MainSection>
            <div>{post.content}</div>
            <BottomInfo>
              <span>{post.date}</span>
              <div>
                <FaThumbsUp
                  className={liked ? "icon liked" : "icon"}
                  onClick={changeLike}
                />
                {likeCount}
              </div>
            </BottomInfo>
            <hr />
          </MainSection>
          <CommentSection>
            <Textarea
              placeholder="당신의 의견을 댓글로 남겨 주세요!"
              rows={3}
              onChange={onChangeComment}
              Button={
                <CommentButton type="button" onClick={registerComment}>
                  댓글 등록
                </CommentButton>
              }
            />
            {post.category === "qna" ? (
              <ul>
                {post.comments &&
                  post.comments.map((el) => (
                    <AnswerItem data={el} key={el.id} />
                  ))}
              </ul>
            ) : (
              <ul>
                {post.comments &&
                  post.comments.map((el) => (
                    <CommentItem data={el} key={el.id} />
                  ))}
              </ul>
            )}
          </CommentSection>
        </EntireSection>
      </Background>
    </main>
  );
};

export default CommunityPostDetailPage;
