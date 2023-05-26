import { useModal } from "../../hooks/useModal";
import styled from "styled-components";
import RecipeColor from "./RecipeColor";
import RecipeAlcohol from "./RecipeAlcohol";
import { colorState, alcoholState } from "../../store/recipe";
import { useRecoilState } from "recoil";
import { FaTimesCircle } from "react-icons/fa";

const RecipeBtn = () => {
  const { openModal, closeModal } = useModal();
  const [{ alcohol }, setAlcohol] = useRecoilState(alcoholState);
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
  const clearAlcohol = (e) => {
    e.stopPropagation();
    setAlcohol({
      alcohol: "",
    });
  };
  const clearColor = (e) => {
    e.stopPropagation();
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
  };

  return (
    <ButtonBox>
      <Button
        onClick={() =>
          openModal(RecipeAlcohol, {
            handleClose: closeModal,
          })
        }
      >
        {alcohol || "도수"}
        {alcohol && <FaTimesCircle onClick={clearAlcohol} />}
      </Button>

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
          <FaTimesCircle onClick={clearColor} />
        </Button>
      )}
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  height: 2.25rem;
  border: 1px solid ${({ theme }) => theme.color.secondGold};
  border-radius: 1.25rem;
  color: ${({ theme }) => theme.color.secondGold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
`;

export default RecipeBtn;
