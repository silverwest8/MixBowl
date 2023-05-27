import { useEffect } from "react";
import styled from "styled-components";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeDrop from "./RecipeDrop";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  searchState,
  alcoholState,
  sortState,
  colorState,
  AddRecipeState,
} from "../../store/recipe";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { theme } from "../../styles/theme";

const RecipeCard = () => {
  const search = useRecoilValue(searchState);
  const color = useRecoilValue(colorState);
  const { alcohol } = useRecoilValue(alcoholState);
  const sort = useRecoilValue(sortState);
  const addRecipeState = useResetRecoilState(AddRecipeState);
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();

  const colorFilter = () => {
    const colorNum = [];
    if (color.red) colorNum.push(1);
    if (color.orange) colorNum.push(2);
    if (color.yellow) colorNum.push(3);
    if (color.green) colorNum.push(4);
    if (color.blue) colorNum.push(5);
    if (color.purple) colorNum.push(6);
    if (color.pink) colorNum.push(7);
    if (color.black) colorNum.push(8);
    if (color.brown) colorNum.push(9);
    if (color.grey) colorNum.push(10);
    if (color.white) colorNum.push(11);
    if (color.transparent) colorNum.push(12);
    return colorNum;
  };

  const alcoholFilter = () => {
    const alcoholNum = [];
    if (alcohol === "낮음") alcoholNum.push(0);
    if (alcohol === "중간") alcoholNum.push(1);
    if (alcohol === "높음") alcoholNum.push(2);
    return alcoholNum;
  };

  const GetRecipe = async (page) => {
    try {
      const colorInit = colorFilter();
      const alcohoInit = alcoholFilter();
      axios.defaults.headers.common.Authorization = token;
      let url = `/api/recipes/list/filter/${page}?alcoholic=[${alcohoInit}]&color=[${colorInit}]&search=${search}`;
      if (sort.latest) {
        url += "&sort=new";
      }
      const { data } = await axios.get(url);
      return { page, ...data };
    } catch (error) {
      console.log("empty or error");
      return { page, list: [], count: 0 };
    }
  };

  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["recipe", sort, color, alcohol, search],
    ({ pageParam = 1 }) => GetRecipe(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count === 0) return undefined;
        else return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    addRecipeState();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <MiddleBox>
      <CardBox>
        <div className="arr">
          <p>{sort.latest === true ? "최신순" : "추천순"}</p>
          <RecipeDrop />
        </div>
        {isSuccess
          ? data.pages.map((page) =>
              page.list.map((item) => (
                <RecipeBox key={item.id}>
                  {token ? (
                    <Link to={`/recipe/${item.id}`}>
                      <img src={`/api/recipes/image/${item.id}`}></img>
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
            )
          : Array(20)
              .fill(1)
              .map((_, index) => (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height="13rem"
                  key={index}
                  sx={{
                    backgroundColor: theme.color.darkGray,
                  }}
                />
              ))}
      </CardBox>
      <div ref={ref}></div>
    </MiddleBox>
  );
};

const NickName = styled.div`
  display: flex;
  font-size: 0.875rem;
  margin-top: 0.3rem;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  p {
    font-size: 0.875rem;
    margin-top: 0.3rem;
    gap: 0.2rem;
  }
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-items: center;

  .arr {
    grid-column: 1 / -1;
    grid-row: 1;
    justify-self: end;
    margin-right: 1rem;
    display: flex;
    p {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }

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
  .ThumbsUp {
    display: flex;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .Comment {
    display: flex;
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 10px solid pink;
`;

export default RecipeCard;
