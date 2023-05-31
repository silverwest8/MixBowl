import styled from "styled-components";
import MyPostingItem from "../components/community/MyPostingItem";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { HiPencilAlt } from "react-icons/hi";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewItem from "../components/mypage/ReviewItem";
import LoadingPage from "./Loading";

const Background = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .icon {
    margin-right: 0.6rem;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5rem;
  width: 60vw;
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
  max-width: 1080px;
  padding: 0 1rem;
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4rem 2rem 2rem 2rem;
  align-items: center;
  text-align: center;
  width: 90vw;
  > div {
    font-size: 2rem;
    .gold {
      color: ${({ theme }) => theme.color.primaryGold};
      margin-left: 1rem;
    }
  }
  > div:last-child {
    width: 100%;
    padding-right: 1rem;
  }
  @media screen and (max-width: 720px) {
    width: 90vw;
    .hidden {
      display: none;
    }
  }
  @media screen and (max-width: 350px) {
    width: 60vw;
  }
  .hover {
    &:hover {
      color: ${({ theme }) => theme.color.primaryGold};
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

const MyReviewPage = () => {
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();
  const [username, setUsername] = useState("기본 유저");
  const [level, setLevel] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  const GetComment = async (page) => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.get(`/api/mypages/reviews/${page}`);
      const userInfoResponse = await axios.get(`/api/users`);
      setUsername(userInfoResponse.data.data.NICKNAME);
      setLevel(userInfoResponse.data.data.LEVEL);
      return { page, list: data.list, count: data.list.length };
    } catch (error) {
      console.log("empty or error");
      return { page, list: [], count: 0 };
    }
  };

  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["page"],
    ({ pageParams = 1 }) => GetComment(pageParams),
    {
      getNextPageParam: (lastPage) => {
        console.log("lastPage is ", lastPage);
        if (lastPage.list.length === 0 || lastPage.count < 10) {
          return undefined; // No more pages
        }
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      setIsLoading(true);
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
    }
  }, [isSuccess]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Background>
          <TopSection>
            <div>
              <Link to={"/mypage"}>
                <MdArrowBackIosNew className="hover" />
              </Link>
            </div>
            <div>
              <span className="hidden">
                <span className="gold">{username}</span>님이{" "}
              </span>
              작성한 리뷰
            </div>
          </TopSection>

          <MainSection>
            <section>
              {isSuccess &&
                data.pages.map((page) =>
                  page.list.map((el) => (
                    <ReviewItem key={el.reviewId} data={el} />
                  ))
                )}
              <div ref={ref}></div>
            </section>
          </MainSection>
        </Background>
      )}
    </main>
  );
};

export default MyReviewPage;
