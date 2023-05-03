import styled from "styled-components";
import Input from "../common/Input";
import { AddRecipeState } from "../../store/recipe";
import { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";

const RecipeTitleImgColor = () => {
  const fileInput = useRef();
  const [{ addImg }, setAddImg] = useRecoilState(AddRecipeState);
  const setAddName = useSetRecoilState(AddRecipeState);
  const [{ addColor }, setAddColor] = useRecoilState(AddRecipeState);
  const [coloritem, setColoritem] = useState({
    red: false,
    pink: false,
    orange: false,
    black: false,
    yellow: false,
    brown: false,
    green: false,
    grey: false,
    blue: false,
    white: false,
    purple: false,
    transparent: false,
  });
  const setToastState = useSetRecoilState(toastState);

  const ToastMessageColor = () => {
    setToastState({
      show: true,
      message: "최대 3개까지만 선택 가능합니다.",
      type: "error",
      ms: 2000,
    });
  };

  const handleAddButton = (e) => {
    fileInput.current.click();
  };

  const handleDeleteButton = (e) => {
    setAddImg((prevAddImg) => ({
      ...prevAddImg,
      addImg: "",
    }));
  };

  const handleImg = (e) => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAddImg((prevAddImg) => ({
        ...prevAddImg,
        addImg: reader.result,
      }));
    };
  };

  const handleColor = (color) => {
    if (addColor.length >= 3) {
      ToastMessageColor();
      setAddColor((prev) => ({ ...prev, addColor: [] }));
      setColoritem({
        red: false,
        pink: false,
        orange: false,
        black: false,
        yellow: false,
        brown: false,
        green: false,
        grey: false,
        blue: false,
        white: false,
        purple: false,
        transparent: false,
      });
    } else {
      setAddColor((prev) => {
        if (prev.addColor.includes(color)) {
          return {
            ...prev,
            addColor: prev.addColor.filter((prevColor) => prevColor !== color),
          };
        } else {
          return { ...prev, addColor: [...prev.addColor, color] };
        }
      });

      setColoritem((prevColoritem) => {
        return { ...prevColoritem, [color]: !prevColoritem[color] };
      });
    }
  };

  const handleName = (e) => {
    setAddName((prev) => ({
      ...prev,
      addName: e.target.value,
    }));
  };

  return (
    <>
      <TopBox>
        <h1>새 레시피 작성</h1>
        <FlexBox>
          <img
            src={
              addImg === ""
                ? "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                : addImg
            }
          />
          <ButtonBox>
            <Button onClick={handleAddButton}>첨부</Button>
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              onChange={handleImg}
              style={{ display: "none" }}
            />
            <Button onClick={handleDeleteButton}>삭제</Button>
          </ButtonBox>
        </FlexBox>
      </TopBox>
      <RecipeBox>
        <Input placeholder={"칵테일 이름"} onChange={handleName}></Input>
      </RecipeBox>
      <RecipeBox>
        <ColorBox>
          색상
          <ColorButtonBox>
            <ColorButton
              bgColor="#FF0000"
              onClick={() => {
                handleColor("red");
              }}
            >
              {coloritem.red === true ? <FaCheckCircle></FaCheckCircle> : null}
              빨강
            </ColorButton>
            <ColorButton
              bgColor="#FF9900"
              onClick={() => {
                handleColor("orange");
              }}
            >
              {coloritem.orange === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              주황
            </ColorButton>
            <ColorButton
              bgColor="#FFC700"
              onClick={() => {
                handleColor("yellow");
              }}
            >
              {coloritem.yellow === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              노랑
            </ColorButton>
            <ColorButton
              bgColor="#04D100"
              onClick={() => {
                handleColor("green");
              }}
            >
              {coloritem.green === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              초록
            </ColorButton>
            <ColorButton
              bgColor="#0066FF"
              onClick={() => {
                handleColor("blue");
              }}
            >
              {coloritem.blue === true ? <FaCheckCircle></FaCheckCircle> : null}
              파랑
            </ColorButton>
            <ColorButton
              bgColor="#AD00FF"
              onClick={() => {
                handleColor("purple");
              }}
            >
              {coloritem.purple === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              보라
            </ColorButton>
            <ColorButton
              bgColor="#FF41D5"
              onClick={() => {
                handleColor("pink");
              }}
            >
              {coloritem.pink === true ? <FaCheckCircle></FaCheckCircle> : null}
              분홍
            </ColorButton>
            <ColorButton
              bgColor="#000000"
              style={{ border: "1px solid #E9AA33" }}
              onClick={() => {
                handleColor("black");
              }}
            >
              {coloritem.black === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              검정
            </ColorButton>
            <ColorButton
              bgColor="#532503"
              onClick={() => {
                handleColor("brown");
              }}
            >
              {coloritem.brown === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              갈색
            </ColorButton>
            <ColorButton
              bgColor="#787878"
              onClick={() => {
                handleColor("grey");
              }}
            >
              {coloritem.grey === true ? <FaCheckCircle></FaCheckCircle> : null}
              회색
            </ColorButton>
            <ColorButton
              bgColor="#FFFFFF"
              textColor="#000000"
              onClick={() => {
                handleColor("white");
              }}
            >
              {coloritem.white === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              흰색
            </ColorButton>
            <ColorButton
              bgColor="#3E3E3E"
              onClick={() => {
                handleColor("transparent");
              }}
            >
              {coloritem.transparent === true ? (
                <FaCheckCircle></FaCheckCircle>
              ) : null}
              무색
            </ColorButton>
          </ColorButtonBox>
        </ColorBox>
      </RecipeBox>
    </>
  );
};

const RecipeBox = styled.div`
  width: 40vw;
  margin: auto;
  @media screen and (max-width: 840px) {
    width: 80vw;
  }
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  img {
    height: 8.875rem;
    width: 8.875rem;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 0.75rem;
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
const Button = styled.button`
  width: 3.25rem;
  height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  color: ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.5rem;
  font-size: 0.75rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.1rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
    color: white;
  }
`;

const ColorBox = styled.div`
  margin-top: 2rem;
`;

const ColorButton = styled.button`
  width: 6rem;
  height: 3rem;
  border-radius: 1rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 350px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default RecipeTitleImgColor;
