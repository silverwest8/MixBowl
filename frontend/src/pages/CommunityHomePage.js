import SearchBar from "../components/common/SearchBar";
// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import FreeListItem from "../components/common/FreeListItem";
import { FaFire, FaComments } from "react-icons/fa";

const dummyData = [
  {
    id: 0,
    title:
      "제목 예시입니다. 만약 제목 길이가 아주 길다면 어떻게 될지 한 번 보도록 하겠습니다.",
    category: "freeboard",
    username: "user01",
    likes: 16,
    comments: 3,
    date: new Date(),
    maintext: "본문 예시입니다.",
  },
  {
    id: 1,
    title: "두 번째 제목 예시",
    category: "freeboard",
    username: "username1234567",
    likes: 0,
    comments: 100,
    date: new Date(),
    maintext:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
];

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7rem 0;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
  }
`;

const HotPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60%;
  margin-bottom: 5rem;
  > h1 {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
  }
`;
const NewPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60%;
  > section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    > h1 {
      display: flex;
      flex-direction: row;
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
      <Background>
        <HotPosts>
          <h1>
            <FaFire className="icon" />
            이번주 인기글
          </h1>
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
