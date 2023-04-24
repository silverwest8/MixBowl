import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";

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
    <CardBox>
      {Recipe.map((index) => (
        <RecipeBox key={index}>
          <img src={index.image_path}></img>
          <h1>{index.name}</h1>
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
  margin: 2rem;
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

export default RecipeCard;
