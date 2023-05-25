import React, { useEffect, useState } from "react";
import styled from "styled-components";

const wholeTextArray = [
  "apple",
  "banana",
  "coding",
  "javascript",
  "원티드",
  "프리온보딩",
  "프론트엔드",
];

const AutoCompleteCocktail = () => {
  const [inputValue, setInputValue] = useState("");
  const [hasInputValue, setHasInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const showDropDownList = () => {
    if (inputValue === "") {
      setHasInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setHasInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setHasInputValue(false);
  };

  const handleDropDownKey = (event) => {
    // input에 값이 있을때만 작동
    if (hasInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  return (
    <>
      <InputBox hasInputValue={hasInputValue} autoComplete={true}>
        <Input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          placeholder="칵테일 이름"
          autoComplete={true}
        />
        <DeleteButton onClick={() => setInputValue("")}>&times;</DeleteButton>
      </InputBox>
      <div>
        {hasInputValue && (
          <DropDownBox>
            {dropDownList.length === 0 && (
              <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
            )}
            {dropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <DropDownItem
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex ? "selected" : ""
                  }
                >
                  {dropDownItem}
                </DropDownItem>
              );
            })}
          </DropDownBox>
        )}
      </div>
    </>
  );
};

const activeBorderRadius = "8px 8px 0 0";
const inactiveBorderRadius = "8px 8px 8px 8px";

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.8rem 0.95rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: ${(props) =>
    props.hasInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: ${({ theme }) => theme.color.darkGray};
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default AutoCompleteCocktail;
