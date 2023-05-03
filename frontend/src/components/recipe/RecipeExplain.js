import styled from "styled-components";
import Textarea from "../common/Textarea";
import { useState } from "react";
import { AddRecipeState } from "../../store/recipe";
import { useSetRecoilState } from "recoil";
import { FaCheckCircle } from "react-icons/fa";
import RecipeIngredients from "./RecipeIngredients";

const RecipeExplain = () => {
  const setAddAlcohol = useSetRecoilState(AddRecipeState);
  const setAddExplain = useSetRecoilState(AddRecipeState);
  const [alcohol, setAlcohol] = useState([0, 0, 0]);

  const handleClick = (value) => {
    let alcoholText = "";
    setAlcohol(value);
    if (value[0] === 1) {
      alcoholText = "낮음";
    } else if (value[1] === 1) {
      alcoholText = "보통";
    } else if (value[2] === 1) {
      alcoholText = "높음";
    }
    setAddAlcohol((prev) => ({
      ...prev,
      addAlcohol: alcoholText,
    }));
  };

  const handleExplain = (e) => {
    setAddExplain((prev) => ({
      ...prev,
      addExplain: e.target.value,
    }));
  };

  return (
    <>
      <Box>
        <RecipeBox>
          <p>재료</p>
          <RecipeIngredients></RecipeIngredients>
        </RecipeBox>
        <RecipeBox>
          <p>도수</p>
          <FlexBox>
            <div>
              <AlcoholButton
                onClick={() => {
                  handleClick([1, 0, 0]);
                }}
              >
                {alcohol[0] ? <FaCheckCircle></FaCheckCircle> : null}낮음
              </AlcoholButton>
              <p>0~5</p>
            </div>
            <div>
              <AlcoholButton
                onClick={() => {
                  handleClick([0, 1, 0]);
                }}
              >
                {alcohol[1] ? <FaCheckCircle></FaCheckCircle> : null}보통
              </AlcoholButton>
              <p>6~15</p>
            </div>
            <div>
              <AlcoholButton
                onClick={() => {
                  handleClick([0, 0, 1]);
                }}
              >
                {alcohol[2] ? <FaCheckCircle></FaCheckCircle> : null}높음
              </AlcoholButton>
              <p>16~99</p>
            </div>
          </FlexBox>
        </RecipeBox>
        <RecipeBox>
          <p>레시피</p>
          <Textarea
            onChange={(e) => {
              handleExplain(e);
            }}
            rows={5}
          ></Textarea>
        </RecipeBox>
      </Box>
    </>
  );
};

const RecipeBox = styled.div`
  margin-bottom: 1rem;
  p {
    margin-bottom: 0.5rem;
  }
`;

const AlcoholButton = styled.button`
  width: 7rem;
  height: 3rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  color: ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 0.25rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
    color: white;
  }
  @media screen and (max-width: 350px) {
    width: 5rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  gap: 2rem;
  width: 20rem;
  div {
    text-align: center;
    font-size: 0.875rem;
  }
`;

const Box = styled.div`
  width: 40vw;
  margin: auto;
  @media screen and (max-width: 840px) {
    width: 80vw;
  }
`;

export default RecipeExplain;
