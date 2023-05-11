import SearchBar from "../components/common/SearchBar";
// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import FreeListItem from "../components/community/FreeListItem";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Title from "../components/common/Title";
import { HiPencilAlt } from "react-icons/hi";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState } from "react";

const dummyData = [
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
    comments: 3,
    date: "1일 전",
    maintext: "본문 예시입니다. 짧을 경우.",
  },
  {
    id: 1,
    title: "두 번째 제목 예시",
    category: "free",
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
    // qna는 title 입력값을 아예 안 받을 것인지?
    maintext:
      "질문글 예시입니다. 이런식으로 질문이 bold체로 다 들어가야 되겠죠. 질문의 경우 title이 길어지는 것으로 할까요 아니면 본문을 굵게 표현하는 것으로 할까요?",
    category: "qna",
    username: "한글닉네임열글자라면",
    userlevel: 1,
    liked: true,
    likes: 1,
    comments: 0,
    date: "2일 전",
  },
  {
    id: 3,
    title: "칵테일 추천글 예시",
    category: "recommendation",
    username: "recommend",
    userlevel: 4,
    likes: 3,
    comments: 100,
    date: "5달 전",
    maintext:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 4,
    title: "칵테일 리뷰 예시",
    category: "review",
    username: "recommend",
    userlevel: 4,
    likes: 3,
    comments: 100,
    date: "1년 전",
    maintext:
      "본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.본문 예시입니다.",
  },
  {
    id: 5,
    // qna는 title 입력값을 아예 안 받을 것인지?
    maintext:
      "질문글 예시입니다. 답변이 있을 때와 없을 떄에 따라서 상단에 표시되는지가 달라질 것입니다",
    category: "qna",
    username: "한글",
    userlevel: 1,
    liked: true,
    likes: 0,
    comments: 1,
    date: "2일 전",
  },
];

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 10rem;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 60vw;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
  > div:first-child {
    display: flex;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
    > span {
      font-size: 2rem;
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      .icon {
        margin-right: 1rem;
        &:hover {
          color: ${({ theme }) => theme.color.primaryGold};
        }
      }
    }
    > div:last-child {
      min-width: 15rem;
      max-width: 30vw;
      @media screen and (max-width: 800px) {
        width: 100%;
        margin-top: 1rem;
        min-width: none;
        max-width: none;
      }
    }
  }
  > div:last-child {
    display: flex;
    margin: 3rem 0 0.5rem 0;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
  }
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  color: white;
  border-radius: 10px;
  padding: 0.7rem 0.7rem;
  min-width: 10vw;
  margin: 0rem 1rem 0.5rem 0;
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

const CommunityBoardPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const searchParams = new URLSearchParams(useLocation().search);
  const [menu, setMenu] = useState(
    searchParams.get("category")?.replaceAll('"', "") === "qna"
      ? "질문과 답변"
      : searchParams.get("category")?.replaceAll('"', "") === "recommendation"
      ? "칵테일 추천"
      : searchParams.get("category")?.replaceAll('"', "") === "free"
      ? "자유"
      : searchParams.get("category")?.replaceAll('"', "") === "review"
      ? "칵테일 리뷰"
      : "전체"
  );
  const onChange = (e) => setInput(e.target.value);
  const onSearch = () => {
    navigate(`/community/board?search=${input}`);
    setMenu(`"${input}" 검색 결과`);
  };
  const onClear = () => {
    setInput("");
    navigate(`/community/board`, { replace: true });
  };
  const setTabQna = () => {
    setMenu("질문과 답변");
    navigate(`/community/board?category=qna`);
    console.log("menu is ", menu);
  };
  const setTabRecommendation = () => {
    setMenu("칵테일 추천");
    navigate(`/community/board?category=recommendation`);
  };
  const setTabReview = () => {
    setMenu("칵테일 리뷰");
    navigate(`/community/board?category=review`);
  };
  const setTabFree = () => {
    setMenu("자유");
    navigate(`/community/board?category=free`);
  };
  const setTabEntire = () => {
    setMenu("전체");
    navigate(`/community/board?category=all`);
  };
  const categoryFunction = (e) => {
    if (searchParams.get("category")?.replaceAll('"', "") !== "all") {
      return (
        e.props.data.category ===
        searchParams.get("category")?.replaceAll('"', "")
      );
    } else return true;
  };
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
        <TopSection>
          <div>
            <span>
              <Link to={"/community"}>
                <MdArrowBackIosNew className="icon" />
              </Link>
              {menu}
            </span>
            <SearchBar
              placeholder="관심있는 내용을 검색해보세요!"
              showSearchButton={true}
              onChange={onChange}
              onSearch={onSearch}
              onClear={onClear}
            />
          </div>
          <div>
            <div>
              <Button onClick={setTabEntire}>전체</Button>
              <Button onClick={setTabRecommendation}>칵테일 추천</Button>
              <Button onClick={setTabQna}>질문과 답변</Button>
            </div>
            <div>
              <Button onClick={setTabReview}>칵테일 리뷰</Button>
              <Button onClick={setTabFree}>자유 게시판</Button>
            </div>
          </div>
        </TopSection>
        <MainSection>
          <section>
            {dummyData
              .map((el) => <FreeListItem data={el} key={el.id} />)
              .filter(categoryFunction)}
          </section>
        </MainSection>
        <WritingButton to="/community/posting">
          <HiPencilAlt />
          글쓰기
        </WritingButton>
      </Background>
    </main>
  );
};

export default CommunityBoardPage;
