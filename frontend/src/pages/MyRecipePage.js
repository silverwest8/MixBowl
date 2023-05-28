import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../components/common/MemberBadge";

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

  @media screen and (max-width: 928px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 350px) {
    display: grid;
    grid-template-columns: 1fr;
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

const NoContent = styled.div`
  width: 100%;
  height: 20vh;
  color: ${({ theme }) => theme.color.primaryGold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NickName = styled.div`
  display: flex;
  font-size: 0.875rem;
  margin-top: 0.3rem;
`;

const MyRecipePage = () => {
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();
  const [username, setUsername] = useState("기본 유저");

  const GetPosting = async (page) => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.get(`/api/mypages/recipes/${page}`);
      const userInfoResponse = await axios.get(`/api/users`);
      setUsername(userInfoResponse.data.data.NICKNAME);
      // console.log("data list is ", data.list);
      return { page, list: data.list, count: data.list.length };
    } catch (error) {
      console.log("empty or error");
      return { page, list: [], count: 0 };
    }
  };

  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["page"],
    ({ pageParam = 1 }) => GetPosting(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    fetchNextPage(1);
    console.log("data is ", data);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
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
            추천한 레시피
          </div>
        </TopSection>
        <MainSection>
          <section>
            <RecipeWrapper>
              {isSuccess &&
                data.pages.map((page) =>
                  page.list.map((item) => (
                    <RecipeBox key={item.cocktailId}>
                      {token ? (
                        <Link to={`/recipe/${item.cocktailId}`}>
                          <img
                            src={`/api/recipes/image/${item.cocktailId}`}
                          ></img>
                          <h1>{item.name}</h1>
                        </Link>
                      ) : (
                        <>
                          <img src={item.image_path}></img>
                          <h1>{item.name}</h1>
                        </>
                      )}

                      <TextBox>
                        <NickName>
                          @{item.USER.nickname}
                          <MemberBadge level={item.USER.level} />
                        </NickName>
                        <div>
                          <p className="ThumbsUp">
                            <FaThumbsUp></FaThumbsUp>
                            {item.like}
                          </p>
                          <p className="Comment">
                            <FaCommentDots></FaCommentDots>
                            {item.post}
                          </p>
                        </div>
                      </TextBox>
                    </RecipeBox>
                  ))
                )}
              <div ref={ref}></div>
            </RecipeWrapper>
          </section>
        </MainSection>
      </Background>
    </main>
  );
};

export default MyRecipePage;
