import SearchBar from "../components/common/SearchBar";
// import Textarea from "../components/common/Textarea";
import styled from "styled-components";
import HotListItem from "../components/community/HotListItem";
import { Link, useNavigate } from "react-router-dom";
import { FaFire, FaComments } from "react-icons/fa";
import Title from "../components/common/Title";
import { HiPencilAlt } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import CommunitySearch from "../components/community/CommunitySearch";
import axios from "axios";
import BoardShortListItem from "../components/community/BoardShortListItem";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { menuState, searchState } from "../store/community";
import LoadingPage from "./Loading";

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
  .icon {
    margin-right: 0.6rem;
  }
  /* @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  } */
`;

const HotPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 0 2rem 5rem 2rem;
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
  @media screen and (max-width: 500px) {
    width: 80vw;
  }
  > section {
    width: 60vw;
    @media screen and (max-width: 800px) {
      width: 80vw;
    }
  }
`;
const NewPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 0 2rem 5rem 2rem;
  > section:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
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
  width: 60vw;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
`;

const Button = styled(Link)`
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
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
  cursor: pointer;
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
  const navigate = useNavigate();
  const search = useRecoilValue(searchState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [postings, setPostings] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [frees, setFrees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [input, setInput] = useState("");
  // const onChange = (e) => setInput(e.target.value);
  // const onSearch = () => {
  //   navigate(`/community/board?search=${input}`);
  // };
  // const onClear = () => {
  //   params.delete("query");
  //   setInput("");
  //   navigate(`/community/board${params.toString()}`, { replace: true });
  // };
  const token = localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;

      const postingPromise = axios.get(`/api/communities/list/hotPost`);
      const recommendationsPromise = axios.get(
        `/api/communities/list/category/recommend?page=1`
      );
      const reviewsPromise = axios.get(
        `/api/communities/list/category/review?page=1`
      );
      const freesPromise = axios.get(
        `/api/communities/list/category/free?page=1`
      );
      const questionsPromise = axios.get(
        `/api/communities/list/category/question?page=1`
      );

      const [
        postingResponse,
        recommendationsResponse,
        reviewsResponse,
        freesResponse,
        questionsResponse,
      ] = await Promise.all([
        postingPromise,
        recommendationsPromise,
        reviewsPromise,
        freesPromise,
        questionsPromise,
      ]);

      setPostings(postingResponse.data.data);
      setRecommendations(recommendationsResponse.data.data.slice(0, 5));
      setReviews(reviewsResponse.data.data.slice(0, 5));
      setFrees(freesResponse.data.data.slice(0, 5));
      setQuestions(questionsResponse.data.data.slice(0, 5));
      setLoading(false);
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
      {loading ? (
        <LoadingPage />
      ) : (
        <Background>
          <HotPosts>
            <h3>
              <FaFire className="icon fire" />
              이번주 인기글
            </h3>
            <section>
              {postings.map((el) => (
                <HotListItem data={el} key={el.pno} />
              ))}
            </section>
            <div>
              <Button to="/community/board">더보기</Button>
            </div>
          </HotPosts>
          <NewPosts>
            <section>
              <h1>
                <FaComments className="icon" />
                최신글
              </h1>
              <CommunitySearch placeholder="관심있는 내용을 검색해보세요!" />
              {/* <SearchBar
              showCloseButton={false}
              onChange={onChange}
              onSearch={onSearch}
              onClear={onClear}
            /> */}
            </section>
            <div className="grid-container">
              <Board
                onClick={() => {
                  setMenu("recommend");
                  navigate("/community/board");
                }}
              >
                <span className="mini-title">
                  칵테일 추천
                  <MdArrowForwardIos className="icon" />
                </span>
                <ul>
                  {recommendations.map((el) => (
                    <BoardShortListItem data={el} key={el.PNO} />
                  ))}
                </ul>
              </Board>
              <Board
                onClick={() => {
                  setMenu("question");
                  navigate("/community/board");
                }}
              >
                <span className="mini-title">
                  질문과 답변
                  <MdArrowForwardIos className="icon" />
                </span>
                <ul>
                  {questions.map((el) => (
                    <BoardShortListItem data={el} key={el.PNO} />
                  ))}
                </ul>
              </Board>
              <Board
                onClick={() => {
                  setMenu("review");
                  navigate("/community/board");
                }}
              >
                <span className="mini-title">
                  칵테일 리뷰
                  <MdArrowForwardIos className="icon" />
                </span>
                <ul>
                  {reviews.map((el) => (
                    <BoardShortListItem data={el} key={el.PNO} />
                  ))}
                </ul>
              </Board>
              <Board
                onClick={() => {
                  setMenu("free");
                  navigate("/community/board");
                }}
              >
                <span className="mini-title">
                  자유게시판
                  <MdArrowForwardIos className="icon" />
                </span>
                <ul>
                  {frees.map((el) => (
                    <BoardShortListItem data={el} key={el.PNO} />
                  ))}
                </ul>
              </Board>
            </div>
          </NewPosts>
          {token && (
            <WritingButton to="/community/posting">
              <HiPencilAlt />
              글쓰기
            </WritingButton>
          )}
        </Background>
      )}
    </main>
  );
};

export default CommunityHomePage;
