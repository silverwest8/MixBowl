import SearchBar from "../components/common/SearchBar";
// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import FreeListItem from "../components/community/FreeListItem";
import { Link } from "react-router-dom";
import { FaFire, FaComments } from "react-icons/fa";
import Title from "../components/common/Title";
import { HiPencilAlt } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import BoardShortListItem from "../components/community/BoardShortListItem";

const dummyData = [
  {
    id: 0,
    title:
      "제목 예시입니다. 만약 제목 길이가 아주 길다면 어떻게 될지 한 번 보도록 하겠습니다. 이런 식으로 길어진다면 글자수 제한을 해야 되겠죠.",
    category: "자유게시판",
    username: "user01",
    userlevel: 3,
    liked: true,
    likes: 16,
    comments: 3,
    date: "1일 전",
    maintext: "본문 예시입니다. 짧을 경우.",
  },
  {
    id: 1,
    title: "두 번째 제목 예시",
    category: "자유게시판",
    username: "username10",
    userlevel: 2,
    likes: 0,
    comments: 100,
    date: "5일 전",
    // TODO : 나중에는 date 타입으로 받아올것
    maintext:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 2,
    maintext:
      "질문글 예시입니다. 이런식으로 질문이 bold체로 다 들어가야 되겠죠. 질문의 경우 title이 길어지는 것으로 할까요 아니면 본문을 굵게 표현하는 것으로 할까요?",
    category: "질문과 답변",
    username: "한글닉네임열글자라면",
    userlevel: 1,
    liked: true,
    likes: 1,
    comments: 0,
    date: "2일 전",
  },
];

const RecentRecommandation = [
  {
    id: 0,
    title:
      "칵테일 추천글 예시 만약 제목이 너무 길어진다면 이런 식으로 표시됩니다",
    comments: 120,
  },
  {
    id: 1,
    title: "칵테일 추천글 예시",
    comments: 19,
  },
  {
    id: 2,
    title: "칵테일 추천글 예시",
    comments: 5,
  },
  {
    id: 3,
    title: "칵테일 추천글 예시",
    comments: 1,
  },
  {
    id: 4,
    title: "칵테일 추천글 예시",
    comments: 0,
  },
];
const RecentQustion = [
  {
    id: 0,
    title: "칵테일 질문글 예시",
    comments: 120,
  },
  {
    id: 1,
    title: "칵테일 질문글 예시",
    comments: 19,
  },
  {
    id: 2,
    title: "칵테일 질문글 예시",
    comments: 5,
  },
  {
    id: 3,
    title: "칵테일 질문글 예시",
    comments: 1,
  },
  {
    id: 4,
    title: "칵테일 질문글 예시",
    comments: 0,
  },
];
const RecentReview = [
  {
    id: 0,
    title: "칵테일 리뷰글 예시",
    comments: 120,
  },
  {
    id: 1,
    title: "칵테일 리뷰글 예시",
    comments: 19,
  },
  {
    id: 2,
    title: "칵테일 추천글 예시",
    comments: 5,
  },
  {
    id: 3,
    title: "칵테일 리뷰글 예시",
    comments: 1,
  },
  {
    id: 4,
    title: "칵테일 리뷰글 예시",
    comments: 0,
  },
];

const RecentFree = [
  {
    id: 0,
    title: "자유게시글 예시",
    comments: 120,
  },
  {
    id: 1,
    title: "자유게시글 예시",
    comments: 19,
  },
  {
    id: 2,
    title: "자유게시글 예시",
    comments: 5,
  },
  {
    id: 3,
    title: "자유게시글 예시",
    comments: 1,
  },
  {
    id: 4,
    title: "자유게시글 예시",
    comments: 0,
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
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const HotPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60vw;
  margin-bottom: 5rem;
  > h3 {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    .icon {
      color: ${({ theme }) => theme.color.red};
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
  }
`;
const NewPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60vw;
  > section:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 800px) {
      flex-direction: column;
      > div {
        margin-top: 1rem;
      }
    }
    > h1 {
      display: flex;
      flex-direction: row;
      margin-bottom: 0.5rem;
      font-weight: bold;
      font-size: 1.5rem;
    }
    > div {
      width: 40%;
      min-width: 17.5rem;
    }
  }
  .grid-container {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: auto auto;
    gap: 2rem;
    margin-top: 1rem;
    max-width: 60vw;
    @media screen and (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  color: white;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
  }
`;

const Board = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: grid;
  > span {
    color: ${({ theme }) => theme.color.primaryGold};
    font-weight: bold;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 0.7rem;
    }
  }
  > ul {
    margin-top: 0.8rem;
  }
`;

const WritingButton = styled(Link)`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 9;
  color: white;
  padding: 0.7rem 0.7rem;
  width: 6rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-around;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondGold};
    cursor: pointer;
  }
`;

const CommunityHomePage = () => {
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
        <HotPosts>
          <h3>
            <FaFire className="icon fire" />
            이번주 인기글
          </h3>
          <section>
            {dummyData.map((el) => (
              <FreeListItem data={el} key={el.id} />
            ))}
          </section>
          <div>
            <Button>더보기</Button>
          </div>
        </HotPosts>
        <NewPosts>
          <section>
            <h1>
              <FaComments className="icon" />
              최신글
            </h1>
            <SearchBar
              placeholder="관심있는 내용을 검색해보세요!"
              showSearchButton={true}
            />
          </section>
          <div className="grid-container">
            <Board>
              <span className="mini-title">
                칵테일 추천
                <MdArrowForwardIos className="icon" />
              </span>
              <ul>
                {RecentRecommandation.map((el) => (
                  <BoardShortListItem data={el} key={el.id} />
                ))}
              </ul>
            </Board>
            <Board>
              <span className="mini-title">
                질문과 답변
                <MdArrowForwardIos className="icon" />
              </span>
              <ul>
                {RecentQustion.map((el) => (
                  <BoardShortListItem data={el} key={el.id} />
                ))}
              </ul>
            </Board>
            <Board>
              <span className="mini-title">
                칵테일 리뷰
                <MdArrowForwardIos className="icon" />
              </span>
              <ul>
                {RecentReview.map((el) => (
                  <BoardShortListItem data={el} key={el.id} />
                ))}
              </ul>
            </Board>
            <Board>
              <span className="mini-title">
                자유게시판
                <MdArrowForwardIos className="icon" />
              </span>
              <ul>
                {RecentFree.map((el) => (
                  <BoardShortListItem data={el} key={el.id} />
                ))}
              </ul>
            </Board>
          </div>
        </NewPosts>
        <WritingButton to="/community/posting">
          <HiPencilAlt />
          글쓰기
        </WritingButton>
      </Background>
    </main>
  );
};

export default CommunityHomePage;
