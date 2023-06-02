import styled from "styled-components";
import FreeListItem from "../components/community/FreeListItem";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { HiPencilAlt } from "react-icons/hi";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { menuState, searchState, AddPostingState } from "../store/community";
import axios from "axios";
import LoadingPage from "./Loading";
import CommunitySearch from "../components/community/CommunitySearch";

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
  const search = useRecoilValue(searchState);
  const [menu, setMenu] = useRecoilState(menuState);
  const addPostingState = useResetRecoilState(AddPostingState);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();
  const [menutext, setMenutext] = useState("전체");
  const setTabQna = () => {
    setMenutext("질문과 답변");
    setMenu("question");
  };
  const setTabRecommendation = () => {
    setMenutext("칵테일 추천");
    setMenu("recommend");
  };
  const setTabReview = () => {
    setMenutext("칵테일 리뷰");
    setMenu("review");
  };
  const setTabFree = () => {
    setMenutext("자유");
    setMenu("free");
  };
  const setTabEntire = () => {
    setMenutext("전체");
    setMenu("");
  };

  const GetPosting = async (page, search, menu) => {
    try {
      axios.defaults.headers.common.Authorization = token;
      let url = `/api/communities/list/category/${menu}?page=${page}`;
      if (menu === "") {
        url = `/api/communities/list/all?page=${page}`;
      }
      if (search !== "") {
        url += `&search=${search}`;
      }
      const { data } = await axios.get(url);
      return { page, list: data.data, count: data.data.length };
    } catch (error) {
      console.log("empty or error");
      return { page, list: [], count: 0 };
    }
  };

  const { isSuccess, data, fetchNextPage, remove, hasNextPage } =
    useInfiniteQuery(
      ["board", search, menu],
      ({ pageParam = 1 }) => GetPosting(pageParam, search, menu),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.page + 1;
        },
      }
    );

  useEffect(() => {
    remove();
    fetchNextPage(1);
    // 검색어, 메뉴 바뀔 때마다
    setIsLoading(true);
  }, [search, menu]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    addPostingState();
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
        <TopSection>
          <div>
            <span>
              <Link to={"/community"}>
                <MdArrowBackIosNew className="icon" />
              </Link>
              {search !== ""
                ? `"${search}" 검색 결과`
                : menu === "question"
                ? "질문과 답변"
                : menu === "recommend"
                ? "칵테일 추천"
                : menu === "free"
                ? "자유"
                : menu === "review"
                ? "칵테일 리뷰"
                : "전체"}
            </span>

            <CommunitySearch placeholder="관심있는 내용을 검색해보세요!" />
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
        {isLoading ? (
          <LoadingPage />
        ) : (
          <MainSection>
            <section>
              {isSuccess &&
                data.pages.map((page) =>
                  page.list.map((item) => (
                    <FreeListItem data={item} key={item.PNO} />
                  ))
                )}
              <div ref={ref}></div>
            </section>
          </MainSection>
        )}

        {token && (
          <WritingButton to="/community/posting">
            <HiPencilAlt />
            글쓰기
          </WritingButton>
        )}
      </Background>
    </main>
  );
};

export default CommunityBoardPage;
