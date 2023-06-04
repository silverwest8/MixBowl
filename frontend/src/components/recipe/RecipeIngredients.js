import { useState } from "react";
import RecipeInputBox from "./RecipeInputBox";
import styled from "styled-components";
import { AddRecipeState } from "../../store/recipe";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import {
  RiIndeterminateCircleLine,
  RiIndeterminateCircleFill,
  RiAddCircleLine,
  RiAddCircleFill,
} from "react-icons/ri";

const RecipeIngredients = () => {
  const [hover, setHover] = useState(false);
  const [{ addItem }, setAddItem] = useRecoilState(AddRecipeState);
  const setToastState = useSetRecoilState(toastState);
  const [minusHover, setMinusHover] = useState(Array(10).fill(false));
  let timerHover;

  const handleAdd = () => {
    if (addItem.length < 10) {
      setAddItem((prevState) => {
        return {
          ...prevState,
          addItem: [
            ...prevState.addItem,
            {
              addLength: prevState.addItem.length + 1,
              addName: "",
              addAmount: null,
              addUnit: "",
            },
          ],
        };
      });
    } else {
      setToastState({
        show: true,
        message: "최대 10개 까지 입력이 가능합니다.",
        type: "error",
        ms: 2000,
      });
    }
  };

  const handleDelete = (index) => {
    setAddItem((prevState) => {
      if (prevState.addItem.length > 2) {
        const deleteItem = [...prevState.addItem];
        deleteItem.splice(index, 1);
        const updatedItem = deleteItem.map((item, i) => {
          return {
            ...item,
            addLength: i + 1,
          };
        });
        return {
          ...prevState,
          addItem: updatedItem,
        };
      }
      return prevState;
    });
  };

  const handleName = (index, e) => {
    setAddItem((prevState) => {
      const list = [...prevState.addItem];
      list[index] = { ...list[index], addName: e.target.value };
      return {
        ...prevState,
        addItem: list,
      };
    });
  };

  const handleAmount = (index, e) => {
    setAddItem((prevState) => {
      const list = [...prevState.addItem];
      list[index] = { ...list[index], addAmount: e.target.value };
      return {
        ...prevState,
        addItem: list,
      };
    });
  };

  const handleUnit = (index, e) => {
    setAddItem((prevState) => {
      const list = [...prevState.addItem];
      list[index] = { ...list[index], addUnit: e.target.value };
      return {
        ...prevState,
        addItem: list,
      };
    });
  };

  return (
    <>
      <InputBox>
        <Name>
          {addItem &&
            addItem.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"재료 이름"}
                  onChange={(e) => handleName(index, e)}
                  value={items.addName || ""}
                  maxLength={15}
                ></RecipeInputBox>
              );
            })}
        </Name>
        <Volume>
          {addItem &&
            addItem.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"재료 양"}
                  onChange={(e) => handleAmount(index, e)}
                  value={items.addAmount || ""}
                  maxLength={5}
                ></RecipeInputBox>
              );
            })}
        </Volume>
        <Unit>
          {addItem &&
            addItem.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"단위"}
                  onChange={(e) => handleUnit(index, e)}
                  value={items.addUnit || ""}
                  maxLength={5}
                ></RecipeInputBox>
              );
            })}
        </Unit>
        <Minus>
          {addItem &&
            addItem.map((items, index) => {
              return (
                <MinusButton key={index}>
                  <button
                    onMouseEnter={() => {
                      if (timerHover) {
                        clearTimeout(timerHover);
                      }
                      timerHover = setTimeout(() => {
                        setMinusHover((prevState) => {
                          const list = prevState.map((value, i) => i === index);
                          return list;
                        });
                      }, 40);
                    }}
                    onMouseLeave={() => {
                      if (timerHover) {
                        clearTimeout(timerHover);
                      }
                      timerHover = setTimeout(() => {
                        setMinusHover((prevState) => {
                          const list = prevState.map(() => false);
                          return list;
                        });
                      });
                    }}
                    onClick={() => {
                      if (timerHover) {
                        clearTimeout(timerHover);
                      }
                      timerHover = setTimeout(() => {
                        setMinusHover((prevState) => {
                          const list = prevState.map(() => false);
                          return list;
                        });
                      });
                      handleDelete(index);
                    }}
                  >
                    {minusHover[index] ? (
                      <RiIndeterminateCircleFill />
                    ) : (
                      <RiIndeterminateCircleLine />
                    )}
                  </button>
                </MinusButton>
              );
            })}
        </Minus>
      </InputBox>
      <PlusButton>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            setHover(false);
            handleAdd();
          }}
        >
          {hover ? <RiAddCircleFill /> : <RiAddCircleLine />}
        </button>
      </PlusButton>
    </>
  );
};

const InputBox = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  width: 50%;
  margin-right: 0.5rem;
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 30vw;
  }
`;
const Volume = styled.div`
  width: 30%;
  margin-right: 0.5rem;
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 25vw;
  }
`;

const Unit = styled.div`
  width: 20%;
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (max-width: 840px) {
    width: 18vw;
  }
`;

const Minus = styled.div`
  display: flex;
  gap: 1.75rem;
  flex-direction: column;
`;

const MinusButton = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.color.primaryGold};
`;

const PlusButton = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.primaryGold};
  button {
    margin-top: 0.5rem;
  }
`;

export default RecipeIngredients;
