import { useModal } from "../../hooks/useModal";
import styled from "styled-components";
import RecipeColor from "./RecipeColor";
import RecipeAlcohol from "./RecipeAlcohol";
import { colorState, alcoholState } from "../../store/recipe";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const RecipeButton = () => {
  const { openModal, closeModal } = useModal();
  const [{ min, max }, setAlcohol] = useRecoilState(alcoholState);
  const [
    {
      red,
      pink,
      orange,
      black,
      yellow,
      brown,
      green,
      grey,
      blue,
      white,
      purple,
      transparent,
      no,
    },
    setColor,
  ] = useRecoilState(colorState);

  useEffect(() => {
    setColor({
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
      no: true,
    });
    setAlcohol({
      min: 0,
      max: 0,
    });
  }, []);

  return (
    <ButtonBox>
      {min === 0 && max === 0 ? (
        <Button
          width="7rem"
          onClick={() =>
            openModal(RecipeAlcohol, {
              handleClose: closeModal,
            })
          }
        >
          도수
        </Button>
      ) : (
        <Button
          width="7rem"
          onClick={() =>
            openModal(RecipeAlcohol, {
              handleClose: closeModal,
            })
          }
        >
          {min}~{max}
        </Button>
      )}

      {no === true ||
      (red === false &&
        pink === false &&
        orange === false &&
        black === false &&
        yellow === false &&
        brown === false &&
        green === false &&
        grey === false &&
        blue === false &&
        white === false &&
        purple === false &&
        transparent === false) ? (
        <Button
          width="7rem"
          onClick={() =>
            openModal(RecipeColor, {
              handleClose: closeModal,
            })
          }
        >
          색깔
        </Button>
      ) : (
        <Button
          width="20rem"
          onClick={() =>
            openModal(RecipeColor, {
              handleClose: closeModal,
            })
          }
        >
          {red === true ? <Circle bgColor="#FF0000"></Circle> : null}
          {pink === true ? <Circle bgColor="#FF41D5"></Circle> : null}
          {orange === true ? <Circle bgColor="#FF9900"></Circle> : null}
          {black === true ? <Circle bgColor="#000000"></Circle> : null}
          {yellow === true ? <Circle bgColor="#FFC700"></Circle> : null}
          {brown === true ? <Circle bgColor="#532503"></Circle> : null}
          {green === true ? <Circle bgColor="#04D100"></Circle> : null}
          {grey === true ? <Circle bgColor="#787878"></Circle> : null}
          {blue === true ? <Circle bgColor="#0066FF"></Circle> : null}
          {white === true ? <Circle bgColor="#FFFFFF"></Circle> : null}
          {purple === true ? <Circle bgColor="#AD00FF"></Circle> : null}
          {transparent === true ? <Circle bgColor="#3E3E3E"></Circle> : null}
        </Button>
      )}
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: ${(props) => props.width};
  height: 2.25rem;
  border: 1px solid ${({ theme }) => theme.color.secondGold};
  border-radius: 1.25rem;
  margin-right: 1rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.color.secondGold};
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
`;

export default RecipeButton;
