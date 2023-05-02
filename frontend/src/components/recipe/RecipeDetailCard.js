import { useState, useEffect } from "react";
import styled from "styled-components";
import MemberBadge from "../common/MemberBadge";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import DropdownMenu from "../common/DropdownMenu";
import RecipeEditDelete from "./RecipeEditDelete";

const RecipeDetailCard = () => {
  const [Recipe, setRecipe] = useState([]);
  const [Like, setLike] = useState(Recipe.rec);
  const [LikeCheck, setLikeCheck] = useState(false);
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

  useEffect(() => {
    if (Recipe.rec) {
      setLike(Recipe.rec);
    }
  }, [Recipe]);

  return (
    <>
      <TopBox>
        <RecipeBox>
          <img src={Recipe.image_path}></img>
          <TextBox>
            <h1>
              {Recipe.name} <RecipeEditDelete />
            </h1>
            <User>
              @{Recipe.uname}
              <MemberBadge level={Recipe.level} />
            </User>
            <p>{Recipe.day}</p>
            <p>
              <span>도수</span> {Recipe.alcohol}도
            </p>
            {Recipe.color && (
              <p>
                <span>색상</span>
                {Recipe.color.includes("red") ? (
                  <Circle bgColor="#FF0000"></Circle>
                ) : null}
                {Recipe.color.includes("pink") ? (
                  <Circle bgColor="#FF41D5"></Circle>
                ) : null}
                {Recipe.color.includes("orange") ? (
                  <Circle bgColor="#FF9900"></Circle>
                ) : null}
                {Recipe.color.includes("black") ? (
                  <Circle bgColor="#000000"></Circle>
                ) : null}
                {Recipe.color.includes("yellow") ? (
                  <Circle bgColor="#FFC700"></Circle>
                ) : null}
                {Recipe.color.includes("brown") ? (
                  <Circle bgColor="#532503"></Circle>
                ) : null}
                {Recipe.color.includes("green") ? (
                  <Circle bgColor="#04D100"></Circle>
                ) : null}
                {Recipe.color.includes("grey") ? (
                  <Circle bgColor="#787878"></Circle>
                ) : null}
                {Recipe.color.includes("blue") ? (
                  <Circle bgColor="#0066FF"></Circle>
                ) : null}
                {Recipe.color.includes("white") ? (
                  <Circle bgColor="#FFFFFF"></Circle>
                ) : null}
                {Recipe.color.includes("purple") ? (
                  <Circle bgColor="#AD00FF"></Circle>
                ) : null}
                {Recipe.color.includes("transparent") ? (
                  <Circle bgColor="#3E3E3E"></Circle>
                ) : null}
              </p>
            )}
          </TextBox>
        </RecipeBox>
        <Material>
          <div>
            <span>필수 재료</span>
            {Recipe.main}
          </div>
          <div>
            <span>부재료</span>
            {Recipe.sub}
          </div>
          <div className="how">{Recipe.how}</div>
        </Material>
      </TopBox>
      <MidBox>
        <RecBox>
          <button>
            <FaThumbsUp
              onClick={() => {
                LikeCheck === true ? setLike(Like - 1) : setLike(Like + 1);
                setLikeCheck(!LikeCheck);
              }}
              style={{
                color: LikeCheck === true ? "#E9AA33" : "white",
                fontSize: "2rem",
              }}
            ></FaThumbsUp>
          </button>
          <p style={{ color: LikeCheck === true ? "#E9AA33" : "white" }}>
            {Like}
          </p>
        </RecBox>
        <HorizonLine></HorizonLine>
      </MidBox>
    </>
  );
};

const User = styled.p`
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

const TextBox = styled.div`
  margin-left: 2rem;
  flex-grow: 1;
  h1 {
    display: flex;
    justify-content: space-between;
    div {
      margin-left: 1rem;
      display: flex;
    }
  }
  p {
    display: flex;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
    div {
      margin-right: 0.5rem;
    }
  }
`;

const RecipeBox = styled.div`
  display: flex;
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
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin-top: 1rem;
    span {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.color.primaryGold};
    }
  }
  .how {
    margin-top: 2rem;
  }
`;

const TopBox = styled.div`
  width: 50vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  }
  @media screen and (max-width: 1024px) {
    width: 80vw;
  }
`;

const MidBox = styled.div`
  width: 50vw;
  margin: auto;
  margin-top: 2rem;
  div {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 1024px) {
    width: 80vw;
  }
`;

const RecBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  p {
    margin-left: 0.5rem;
  }
`;

const HorizonLine = styled.div`
  border: 0.1rem solid #e9aa33;
  line-height: 0.1em;
  margin: auto;
  margin-top: 0.5rem;
`;

const Circle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
`;

export default RecipeDetailCard;
