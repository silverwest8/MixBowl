import { useState, useEffect } from "react";
import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetailCard = () => {
  const [Recipe, setRecipe] = useState([]);
  const params = useParams();
  const id = params.id;
  const GetRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/RecipeList?rno=${id}`);
      setRecipe(res.data[0]);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    GetRecipe();
  }, []);

  return (
    <TopBox>
      <RecipeBox>
        <img src={Recipe.image_path}></img>
        <TextBox>
          <h1>{Recipe.name}</h1>
          <p>
            @{Recipe.uname} <MemberBadge level={Recipe.level} />
          </p>
          <p>{Recipe.day}</p>
          <p>
            <span>도수</span> {Recipe.alcohol}도
          </p>
          <p>
            <span>색상</span> {Recipe.color}
          </p>
        </TextBox>
      </RecipeBox>
      <Material>
        <p>
          <span>필수 재료</span> {Recipe.main}
        </p>
        <p>
          <span>부재료</span> {Recipe.sub}
        </p>
      </Material>
      <MaterialHow>
        <p>{Recipe.how}</p>
      </MaterialHow>
      <HorizonLine></HorizonLine>
    </TopBox>
  );
};

const TextBox = styled.div`
  margin-left: 2rem;
  p {
    display: flex;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  div {
    margin-left: 0.5rem;
  }
`;

const RecipeBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
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
`;

const Material = styled.div`
  margin-top: 2rem;
  p {
    margin-top: 1rem;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
`;

const MaterialHow = styled.div`
  width: 70%;
  margin-top: 2rem;
  text-align: center;
  p {
    margin-top: 1rem;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizonLine = styled.div`
  width: 60%;
  border: 0.1rem solid #e9aa33;
  line-height: 0.1em;
  margin: auto;
  margin-top: 2rem;
`;

export default RecipeDetailCard;
