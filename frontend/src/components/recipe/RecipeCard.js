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

const RecipeCard = () => {
  const colorNum = [];
  const alcoholNum = [];
  let sortInit = false;
  const search = useRecoilValue(searchState);
  const color = useRecoilValue(colorState);
  const alcohol = useRecoilValue(alcoholState);
  const sort = useRecoilValue(sortState);
  const addRecipeState = useResetRecoilState(AddRecipeState);
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();

  const colorFilter = () => {
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
  };

  const alcoholFilter = () => {
    if (alcohol.alcohol === "낮음") alcoholNum.push(0);
    if (alcohol.alcohol === "중간") alcoholNum.push(1);
    if (alcohol.alcohol === "높음") alcoholNum.push(2);
  };

  const sortFilter = () => {
    if (sort.latest) sortInit = true;
    return sortInit;
  };

  const GetRecipe = async (page, color, alcohol, sort) => {
    colorFilter();
    alcoholFilter();
    sort = sortFilter();
    try {
      axios.defaults.headers.common.Authorization = token;
      let url = `/api/recipes/list/filter/${page}?alcoholic=[${alcohol}]&color=[${color}]&search=${search}`;
      if (sort) {
        url += "&sort=new";
      }
      const { data } = await axios.get(url);
      console.log(url);
      return { page, list: data.list };
    } catch (error) {
      console.log("empty or error");
    }
  };

  const { isSuccess, data, fetchNextPage, remove } = useInfiniteQuery(
    ["page"],
    ({ pageParam = 1 }) => GetRecipe(pageParam, colorNum, alcoholNum, sortInit),
    {
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    remove();
    fetchNextPage(1);
  }, [search, color, alcohol, sort]);

  useEffect(() => {
    addRecipeState();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <MiddleBox>
      <CardBox>
        <div className="arr">
          <RecipeDrop />
        </div>
        {isSuccess &&
          data.pages.map((page) =>
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
          )}
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
`;

export default RecipeCard;
