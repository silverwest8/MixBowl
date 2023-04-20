import SearchBar from "../components/common/SearchBar";
// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import FreeListItem from "../components/common/FreeListItem";
import { FaFire, FaComments } from "react-icons/fa";
import Title from "../components/common/Title";

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
  width: 70vw;
  margin-bottom: 5rem;
  > h3 {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    font-weight: bold;
    .icon {
      color: ${({ theme }) => theme.color.red};
    }
  }
`;
const NewPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 70vw;
  > section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 400px) {
      flex-direction: column;
      > div {
        margin-top: 1rem;
      }
    }
    > h1 {
      display: flex;
      flex-direction: row;
    }
    > div {
      width: 40%;
      min-width: 17.5rem;
    }
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
        </HotPosts>
        <NewPosts>
          <section>
            <h1>
              <FaComments className="icon" />
              최신글
            </h1>
            <SearchBar
              placholder="관심있는 내용을 검색해보세요!"
              showSearchButton={true}
            />
          </section>
        </NewPosts>
      </Background>
    </main>
  );
};

export default CommunityHomePage;
