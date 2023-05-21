import styled from "styled-components";
import { AddRecipeState, AddRecipeImgState } from "../../store/recipe";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import { postRecipe, editRecipe } from "../../api/recipeapi";

const RecipeSubmit = ({ actionType }) => {
  const navigate = useNavigate();
  const colorNum = [];
  let alcoholNum = 0;
  const { addName, addColor, addItem, addAlcohol, addExplain } =
    useRecoilValue(AddRecipeState);
  const setToastState = useSetRecoilState(toastState);
  const [recipeImg, setRecipeImg] = useRecoilState(AddRecipeImgState);
  const params = useParams();
  const id = params.id;

  const handleSubmit = () => {
    if (addName === "") {
      setToastState({
        show: true,
        message: "제목을 입력해주세요.",
        type: "error",
        ms: 2000,
      });
    } else if (addColor.length === 0) {
      setToastState({
        show: true,
        message: "색상을 선택해주세요.",
        type: "error",
        ms: 2000,
      });
    } else if (
      addItem.some((item) => !item.addName || !item.addAmount || !item.addUnit)
    ) {
      setToastState({
        show: true,
        message: "재료를 확인해주세요.",
        type: "error",
        ms: 2000,
      });
    } else if (addAlcohol === "") {
      setToastState({
        show: true,
        message: "도수를 선택해주세요.",
        type: "error",
        ms: 2000,
      });
    } else if (addExplain === "") {
      setToastState({
        show: true,
        message: "레시피를 설명해주세요.",
        type: "error",
        ms: 2000,
      });
    } else if (actionType === "post") {
      colorFilter();
      alcoholFilter();
      const ingred = addItem.map((item) => ({
        name: item.addName,
        amount: item.addAmount,
        unit: item.addUnit,
      }));

      const isDuplicate = ingred.some((item, index) => {
        return ingred.findIndex((i) => i.name === item.name) !== index;
      });

      if (isDuplicate) {
        setToastState({
          show: true,
          message: "중복된 항목이 있습니다.",
          type: "error",
          ms: 3000,
        });
      } else {
        postRecipe({
          name: addName,
          color: colorNum,
          ingred,
          alcoholic: alcoholNum,
          instruction: addExplain,
          image: [recipeImg],
        })
          .then((response) => {
            console.log(response);
            if (response.success) {
              setToastState({
                show: true,
                message: "작성이 완료되었습니다.",
                type: "success",
                ms: 3000,
              });
              setRecipeImg("");
              navigate(-1);
            } else {
              setToastState({
                show: true,
                message: "수정 실패.",
                type: "error",
                ms: 3000,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else if (actionType === "edit") {
      colorFilter();
      alcoholFilter();
      const ingred = addItem.map((item) => ({
        name: item.addName,
        amount: item.addAmount,
        unit: item.addUnit,
      }));

      const isDuplicate = ingred.some((item, index) => {
        return ingred.findIndex((i) => i.name === item.name) !== index;
      });

      if (isDuplicate) {
        setToastState({
          show: true,
          message: "중복된 항목이 있습니다.",
          type: "error",
          ms: 3000,
        });
      } else {
        editRecipe({
          recipeId: id,
          name: addName,
          color: colorNum,
          ingred,
          alcoholic: alcoholNum,
          instruction: addExplain,
          image: [recipeImg],
        })
          .then((response) => {
            console.log(response);
            if (response.success) {
              setToastState({
                show: true,
                message: "수정이 완료되었습니다.",
                type: "success",
                ms: 3000,
              });
              setRecipeImg("");
              navigate(-2);
            } else {
              setToastState({
                show: true,
                message: "수정 실패",
                type: "error",
                ms: 3000,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setToastState({
              show: true,
              message: "수정 실패",
              type: "error",
              ms: 3000,
            });
          });
      }
    }
  };

  const colorFilter = () => {
    if (addColor.includes("red")) colorNum.push(1);
    if (addColor.includes("orange")) colorNum.push(2);
    if (addColor.includes("yellow")) colorNum.push(3);
    if (addColor.includes("green")) colorNum.push(4);
    if (addColor.includes("blue")) colorNum.push(5);
    if (addColor.includes("purple")) colorNum.push(6);
    if (addColor.includes("pink")) colorNum.push(7);
    if (addColor.includes("black")) colorNum.push(8);
    if (addColor.includes("brown")) colorNum.push(9);
    if (addColor.includes("grey")) colorNum.push(10);
    if (addColor.includes("white")) colorNum.push(11);
    if (addColor.includes("transparent")) colorNum.push(12);
  };

  const alcoholFilter = () => {
    if (addAlcohol.includes("낮음")) alcoholNum = 0;
    if (addAlcohol.includes("보통")) alcoholNum = 1;
    if (addAlcohol.includes("높음")) alcoholNum = 2;
  };

  return (
    <>
      <Box>
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
              handleSubmit();
            }}
          >
            확인
          </button>
        </ButtonWrapper>
      </Box>
    </>
  );
};

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
const Box = styled.div`
  width: 40vw;
  margin: auto;
  @media screen and (max-width: 840px) {
    width: 80vw;
  }
`;

export default RecipeSubmit;
