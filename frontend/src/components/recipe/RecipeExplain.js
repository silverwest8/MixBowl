import styled from "styled-components";
import Textarea from "../common/Textarea";
import { AddRecipeState } from "../../store/recipe";
import { useRecoilState } from "recoil";
import { FaCheckCircle } from "react-icons/fa";
import RecipeIngredients from "./RecipeIngredients";

const RecipeExplain = () => {
  const [{ addAlcohol }, setAddAlcohol] = useRecoilState(AddRecipeState);
  const [{ addExplain }, setAddExplain] = useRecoilState(AddRecipeState);

  const handleClick = (value) => {
    let alcoholText = "";

    if (value === "낮음") {
      alcoholText = "낮음";
    } else if (value === "보통") {
      alcoholText = "보통";
    } else if (value === "높음") {
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
                  handleClick("낮음");
                }}
              >
                {addAlcohol === "낮음" ? <FaCheckCircle></FaCheckCircle> : null}
                낮음
              </AlcoholButton>
              <p>0~5</p>
            </div>
            <div>
              <AlcoholButton
                onClick={() => {
                  handleClick("보통");
                }}
              >
                {addAlcohol === "보통" ? <FaCheckCircle></FaCheckCircle> : null}
                보통
              </AlcoholButton>
              <p>6~15</p>
            </div>
            <div>
              <AlcoholButton
                onClick={() => {
                  handleClick("높음");
                }}
              >
                {addAlcohol === "높음" ? <FaCheckCircle></FaCheckCircle> : null}
                높음
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
            rows={10}
            value={addExplain}
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
  width: 80vw;
  margin: 0 auto;
  max-width: 416px;
`;

export default RecipeExplain;
