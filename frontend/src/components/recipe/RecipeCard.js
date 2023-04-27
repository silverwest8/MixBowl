import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeDrop from "./RecipeDrop";

const RecipeCard = () => {
  const [Recipe, setRecipe] = useState([]);

  const GetRecipe = async () => {
    try {
      const res = await axios.get("http://localhost:4000/RecipeList");
      setRecipe(res.data);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    GetRecipe();
  }, []);

  return (
    <MiddleBox>
      <RecipeDrop />
      <CardBox>
        {Recipe.map((index) => (
          <RecipeBox key={Recipe.rno}>
            <Link to={`/recipe/${index.rno}`}>
              <img src={index.image_path}></img>
              <h1>{index.name}</h1>
            </Link>
            <TextBox>
              <p>
                @{index.uname} <MemberBadge level={index.level} />
              </p>
              <p className="ThumbsUp">
                <FaThumbsUp></FaThumbsUp>
                {index.like}
              </p>
              <p className="Comment">
                <FaCommentDots></FaCommentDots>
                {index.comment}
              </p>
            </TextBox>
          </RecipeBox>
        ))}
      </CardBox>
    </MiddleBox>
  );
};

const TextBox = styled.div`
  display: flex;
  p {
    display: flex;
  }
  div {
    margin-left: 0.5rem;
  }
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-items: center;
  @media screen and (max-width: 1280px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const RecipeBox = styled.div`
  img {
    height: 12.5rem;
    width: 16.25rem;
    border: 2px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 0.75rem;
  }
  h1 {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  .ThumbsUp {
    display: flex;
    color: ${({ theme }) => theme.color.primaryGold};
    margin-left: 8rem;
  }
  .Comment {
    display: flex;
    color: ${({ theme }) => theme.color.lightGray};
    margin-left: 0.75rem;
  }
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default RecipeCard;
