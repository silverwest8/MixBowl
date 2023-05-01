import styled from "styled-components";
import RecipeInputBox from "./RecipeInputBox";
import Textarea from "../common/Textarea";
import RecipeSelect from "./RecipeSelect";
import * as React from "react";
import {
  RiIndeterminateCircleLine,
  RiIndeterminateCircleFill,
  RiAddCircleLine,
  RiAddCircleFill,
} from "react-icons/ri";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { AddRecipeState } from "../../store/recipe";
import { useNavigate } from "react-router-dom";

const AddMainInput = ({ index }) => {
  const [hover, setHover] = useState(false);
  const [{ mainnum }, setMainnum] = useRecoilState(AddRecipeState);
  const [{ main }, setMain] = useRecoilState(AddRecipeState);

  const handleMain = () => {};
  console.log(main);
  return (
    <InputBox>
      <Name>
        <RecipeInputBox
          placeholder={"필수재료 이름"}
          onChange={handleMain}
        ></RecipeInputBox>
      </Name>
      <Volume>
        <RecipeInputBox placeholder={"필수재료 양"}></RecipeInputBox>
      </Volume>
      <Unit>
        <RecipeSelect></RecipeSelect>
      </Unit>
      <MinusButton>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            if (mainnum.length > 1) {
              setMainnum((prev) => ({
                ...prev,
                mainnum: prev.mainnum.slice(0, -1),
              }));
            }
          }}
        >
          {hover === true ? (
            <RiIndeterminateCircleFill />
          ) : (
            <RiIndeterminateCircleLine />
          )}
        </button>
      </MinusButton>
    </InputBox>
  );
};

const AddSubInput = () => {
  const [hover, setHover] = useState(false);
  const [{ subnum }, setSubnum] = useRecoilState(AddRecipeState);
  const [{ sub }, setSub] = useRecoilState(AddRecipeState);
  return (
    <InputBox>
      <Name>
        <RecipeInputBox placeholder={"부재료 이름"}></RecipeInputBox>
      </Name>
      <Volume>
        <RecipeInputBox placeholder={"부재료 양"}></RecipeInputBox>
      </Volume>
      <Unit>
        <RecipeSelect></RecipeSelect>
      </Unit>
      <MinusButton>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            if (subnum.length > 1) {
              setSubnum((prev) => ({
                ...prev,
                subnum: prev.subnum.slice(0, -1),
              }));
            }
          }}
        >
          {hover === true ? (
            <RiIndeterminateCircleFill />
          ) : (
            <RiIndeterminateCircleLine />
          )}
        </button>
      </MinusButton>
    </InputBox>
  );
};

const RecipeWriteB = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState([0, 0]);
  const [{ mainnum }, setMainnum] = useRecoilState(AddRecipeState);
  const [{ subnum }, setSubnum] = useRecoilState(AddRecipeState);
  const [explain, setExplain] = useRecoilState(AddRecipeState);

  return (
    <>
      <RecipeBox>
        <p>필수재료</p>
        {mainnum &&
          mainnum.map((index) => {
            return (
              <AddMainInput key={index} index={mainnum.length}></AddMainInput>
            );
          })}
        <PlusButton>
          <button
            onMouseEnter={() => setHover([1, 0])}
            onMouseLeave={() => setHover([0, 0])}
            onClick={() => {
              setMainnum((prev) => ({
                ...prev,
                mainnum: [...prev.mainnum, 0],
              }));
            }}
          >
            {hover[0] ? <RiAddCircleFill /> : <RiAddCircleLine />}
          </button>
        </PlusButton>
      </RecipeBox>
      <RecipeBox>
        <p>부재료</p>
        {subnum &&
          subnum.map((index) => {
            return <AddSubInput key={index}></AddSubInput>;
          })}
        <PlusButton>
          <button
            onMouseEnter={() => setHover([0, 1])}
            onMouseLeave={() => setHover([0, 0])}
            onClick={() => {
              setSubnum((prev) => ({ ...prev, subnum: [...prev.subnum, 0] }));
            }}
          >
            {hover[1] ? <RiAddCircleFill /> : <RiAddCircleLine />}
          </button>
        </PlusButton>
      </RecipeBox>
      <RecipeBox>
        <p>레시피</p>
        <Textarea
          onChange={(e) => {
            setExplain((prev) => ({ ...prev, explain: e.target.value }));
          }}
        ></Textarea>
        <ButtonWrapper>
          <button
            className="cancel"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            확인
          </button>
        </ButtonWrapper>
      </RecipeBox>
    </>
  );
};

const InputBox = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;
const Name = styled.div`
  width: 20vw;
  margin-right: 0.5rem;
  @media screen and (max-width: 1024px) {
    width: 25vw;
  }
`;
const Volume = styled.div`
  width: 15vw;
  margin-right: 0.5rem;
  @media screen and (max-width: 1024px) {
    width: 17.5vw;
  }
`;

const Unit = styled.div`
  width: 8vw;
  margin-right: 0.5rem;
  font-size: 1rem;
  @media screen and (max-width: 1024px) {
    width: 12vw;
  }
`;

const RecipeBox = styled.div`
  margin-bottom: 2rem;
  p {
    margin-bottom: 0.5rem;
  }
`;

const MinusButton = styled.button`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  &:hover {
    color: ${({ theme }) => theme.color.primaryGold};
  }
`;

const PlusButton = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  button {
    margin-top: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1rem;
  align-items: center;
  margin-top: 1.5rem;
  & > button {
    border-radius: 0.5rem;
    padding: 0.3rem 1.75rem;
    color: inherit !important;
    font-size: 0.875rem;
    line-height: 1.75;
    width: 8.75rem;
    height: 3.25rem;
    background-color: ${({ theme }) => theme.color.primaryGold};
    &.cancel {
      background-color: ${({ theme }) => theme.color.gray};
    }
  }
`;

export default RecipeWriteB;
