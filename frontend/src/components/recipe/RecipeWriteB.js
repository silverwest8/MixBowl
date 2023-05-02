import styled from "styled-components";
import RecipeInputBox from "./RecipeInputBox";
import Textarea from "../common/Textarea";
import * as React from "react";
import {
  RiIndeterminateCircleLine,
  RiIndeterminateCircleFill,
  RiAddCircleLine,
  RiAddCircleFill,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { AddRecipeState, AddItemState } from "../../store/recipe";
import { useNavigate } from "react-router-dom";

const AddMainInput = () => {
  const [hover, setHover] = useState(false);
  const [{ main }, setMain] = useRecoilState(AddItemState);

  const handleAdd = () => {
    setMain((prevState) => {
      return {
        ...prevState,
        main: [
          ...prevState.main,
          {
            mainId: prevState.main.length + 1,
            mainName: "",
            mainAmount: null,
            mainUnit: "",
          },
        ],
      };
    });
  };

  const handleDelete = (index) => {
    setMain((prevState) => {
      if (prevState.main.length > 1) {
        const deleteMain = [...prevState.main];
        deleteMain.splice(index, 1);
        return {
          ...prevState,
          main: deleteMain,
        };
      }
      return prevState;
    });
  };

  const handleName = (index, e) => {
    setMain((prevState) => {
      const list = [...prevState.main];
      list[index] = { ...list[index], mainName: e.target.value };
      return {
        ...prevState,
        main: list,
      };
    });
  };

  const handleAmount = (index, e) => {
    setMain((prevState) => {
      const list = [...prevState.main];
      list[index] = { ...list[index], mainAmount: e.target.value };
      return {
        ...prevState,
        main: list,
      };
    });
  };

  const handleUnit = (index, e) => {
    setMain((prevState) => {
      const list = [...prevState.main];
      list[index] = { ...list[index], mainUnit: e.target.value };
      return {
        ...prevState,
        main: list,
      };
    });
  };

  return (
    <>
      <InputBox>
        <Name>
          {main &&
            main.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"필수재료 이름"}
                  onChange={(e) => handleName(index, e)}
                  value={items.mainName}
                ></RecipeInputBox>
              );
            })}
        </Name>
        <Volume>
          {main &&
            main.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"필수재료 양"}
                  onChange={(e) => handleAmount(index, e)}
                  value={items.mainAmount}
                ></RecipeInputBox>
              );
            })}
        </Volume>
        <Unit>
          {main &&
            main.map((items, index) => {
              return (
                <RecipeInputBox
                  key={index}
                  placeholder={"단위"}
                  onChange={(e) => handleUnit(index, e)}
                  value={items.mainUnit}
                ></RecipeInputBox>
              );
            })}
        </Unit>
        <Minus>
          {main &&
            main.map((items, index) => {
              return (
                <MinusButton key={index}>
                  <button
                    onMouseEnter={() => {
                      setMain((prevState) => {
                        const list = [...prevState.main];
                        const item = { ...list[index], mainHover: true };
                        list[index] = item;
                        return {
                          ...prevState,
                          main: list,
                        };
                      });
                    }}
                    onMouseLeave={() => {
                      setMain((prevState) => {
                        const list = [...prevState.main];
                        const item = { ...list[index], mainHover: false };
                        list[index] = item;
                        return {
                          ...prevState,
                          main: list,
                        };
                      });
                    }}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    {items.mainHover ? (
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
          onMouseEnter={() => setHover([1, 0])}
          onMouseLeave={() => setHover([0, 0])}
          onClick={() => {
            handleAdd();
          }}
        >
          {hover[0] ? <RiAddCircleFill /> : <RiAddCircleLine />}
        </button>
      </PlusButton>
    </>
  );
};

const AddSubInput = () => {
  const [hover, setHover] = useState(false);
  const [{ sub }, setSub] = useRecoilState(AddItemState);

  const handleAdd = () => {
    setSub((prevState) => {
      return {
        ...prevState,
        sub: [
          ...prevState.sub,
          {
            subId: prevState.sub.length + 1,
            subName: "",
            subAmount: null,
            subUnit: "",
          },
        ],
      };
    });
  };

  const handleDelete = (index) => {
    setSub((prevState) => {
      if (prevState.sub.length > 1) {
        const deleteSub = [...prevState.sub];
        deleteSub.splice(index, 1);
        return {
          ...prevState,
          sub: deleteSub,
        };
      }
      return prevState;
    });
  };

  const handleName = (index, e) => {
    setSub((prevState) => {
      const list = [...prevState.sub];
      list[index] = { ...list[index], subName: e.target.value };
      return {
        ...prevState,
        sub: list,
      };
    });
  };

  const handleAmount = (index, e) => {
    setSub((prevState) => {
      const list = [...prevState.sub];
      list[index] = { ...list[index], subAmount: e.target.value };
      return {
        ...prevState,
        sub: list,
      };
    });
  };

  const handleUnit = (index, e) => {
    setSub((prevState) => {
      const list = [...prevState.sub];
      list[index] = { ...list[index], subUnit: e.target.value };
      return {
        ...prevState,
        sub: list,
      };
    });
  };

  return (
    <>
      <InputBox>
        <Name>
          {sub.map((items, index) => {
            return (
              <RecipeInputBox
                key={index}
                placeholder={"부재료 이름"}
                onChange={(e) => handleName(index, e)}
                value={items.subName}
              ></RecipeInputBox>
            );
          })}
        </Name>
        <Volume>
          {sub.map((items, index) => {
            return (
              <RecipeInputBox
                key={index}
                placeholder={"부재료 양"}
                onChange={(e) => handleAmount(index, e)}
                value={items.subAmount}
              ></RecipeInputBox>
            );
          })}
        </Volume>
        <Unit>
          {sub.map((items, index) => {
            return (
              <RecipeInputBox
                key={index}
                placeholder={"단위"}
                onChange={(e) => handleUnit(index, e)}
                value={items.subUnit}
              ></RecipeInputBox>
            );
          })}
        </Unit>
        <Minus>
          {sub &&
            sub.map((items, index) => {
              return (
                <MinusButton key={index}>
                  <button
                    onMouseEnter={() => {
                      setSub((prevState) => {
                        const list = [...prevState.sub];
                        const item = { ...list[index], subHover: true };
                        list[index] = item;
                        return {
                          ...prevState,
                          sub: list,
                        };
                      });
                    }}
                    onMouseLeave={() => {
                      setSub((prevState) => {
                        const list = [...prevState.sub];
                        const item = { ...list[index], subHover: false };
                        list[index] = item;
                        return {
                          ...prevState,
                          sub: list,
                        };
                      });
                    }}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    {items.subHover ? (
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
          onMouseEnter={() => setHover([1, 0])}
          onMouseLeave={() => setHover([0, 0])}
          onClick={() => {
            handleAdd();
          }}
        >
          {hover[0] ? <RiAddCircleFill /> : <RiAddCircleLine />}
        </button>
      </PlusButton>
    </>
  );
};

const RecipeWriteB = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState([0, 0]);
  const [explain, setExplain] = useRecoilState(AddRecipeState);

  return (
    <>
      <RecipeBox>
        <p>필수재료</p>
        <AddMainInput></AddMainInput>
      </RecipeBox>
      <RecipeBox>
        <p>부재료</p>
        <AddSubInput></AddSubInput>
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
              console.log("post");
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
  align-items: center;
`;
const Name = styled.div`
  width: 20vw;
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
  width: 15vw;
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
  width: 8vw;
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
