import styled from "styled-components";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  RiIndeterminateCircleLine,
  RiIndeterminateCircleFill,
  RiAddCircleLine,
  RiAddCircleFill,
} from "react-icons/ri";
import { useState } from "react";

const RecipeInput = () => {
  const [age, setAge] = React.useState("");
  const [hover, setHover] = useState([0, 0, 0, 0]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <RecipeBox>
        <p>필수재료</p>
        <InputBox>
          <Input placeholder={"필수재료 이름"}></Input>
          <Input placeholder={"필수재료 양"}></Input>
          <MinusButton>
            <button
              onMouseEnter={() => setHover([0, 0, 1, 0])}
              onMouseLeave={() => setHover([0, 0, 0, 0])}
            >
              {hover[2] ? (
                <RiIndeterminateCircleFill />
              ) : (
                <RiIndeterminateCircleLine />
              )}
            </button>
          </MinusButton>
        </InputBox>
        <PlusButton>
          <button
            onMouseEnter={() => setHover([1, 0, 0, 0])}
            onMouseLeave={() => setHover([0, 0, 0, 0])}
          >
            {hover[0] ? <RiAddCircleFill /> : <RiAddCircleLine />}
          </button>
        </PlusButton>
      </RecipeBox>
      <RecipeBox>
        <p>부재료</p>
        <InputBox>
          <Input placeholder={"부재료 이름"}></Input>
          <Input placeholder={"부재료 양"}></Input>
          <MinusButton>
            <button
              onMouseEnter={() => setHover([0, 0, 0, 1])}
              onMouseLeave={() => setHover([0, 0, 0, 0])}
            >
              {hover[3] ? (
                <RiIndeterminateCircleFill />
              ) : (
                <RiIndeterminateCircleLine />
              )}
            </button>
          </MinusButton>
        </InputBox>
        <PlusButton>
          <button
            onMouseEnter={() => setHover([0, 1, 0, 0])}
            onMouseLeave={() => setHover([0, 0, 0, 0])}
          >
            {hover[1] ? <RiAddCircleFill /> : <RiAddCircleLine />}
          </button>
        </PlusButton>
      </RecipeBox>
      <RecipeBox>
        <p>레시피</p>
        <Textarea></Textarea>
        <ButtonWrapper>
          <button className="cancel">취소</button>
          <button>확인</button>
        </ButtonWrapper>
      </RecipeBox>
    </>
  );
};

const InputBox = styled.div`
  display: flex;
`;

const RecipeBox = styled.div`
  margin-bottom: 2rem;
  p {
    margin-bottom: 0.5rem;
  }
`;

const MinusButton = styled.button`
  font-size: 1.5rem;
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

export default RecipeInput;
