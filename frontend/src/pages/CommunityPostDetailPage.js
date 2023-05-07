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

const postData = [
  {
    // TODO: 이미지 처리
    id: 0,
    title:
      "제목 예시입니다. 만약 제목 길이가 아주 길다면 어떻게 될지 한 번 보도록 하겠습니다. 이런 식으로 길어진다면 글자수 제한을 해야 되겠죠.",
    category: "자유게시판",
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
    category: "자유게시판",
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
    category: "질문과 답변",
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
];

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7rem 10rem;
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
              <Link to={"/community/board"}>
                <MdArrowBackIosNew className="icon" />
              </Link>
              <span>{post.category}</span>
            </TopMost>
            <Username>
              <span>{post.username}</span>
              <MemberBadge level={post.userlevel} />
            </Username>
            <TitleContainer
              className={post.category === "질문과 답변" ? "none" : ""}
            >
              <span>{post.title}</span>
              <DropdownMenu />
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
            {post.category === "질문과 답변" ? (
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
