import styled from "styled-components";
import { AddRecipeState } from "../../store/recipe";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";

const RecipeSubmit = () => {
  const { addImg, addName, addColor, addItem, addAlcohol, addExplain } =
    useRecoilValue(AddRecipeState);
  const setToastState = useSetRecoilState(toastState);

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
    } else {
      setToastState({
        show: true,
        message: "작성이 완료되었습니다.",
        type: "success",
        ms: 3000,
      });
      navigate(-1);
    }
  };
  console.log(addImg);
  console.log(addName);
  console.log(addColor);
  console.log(addItem);
  console.log(addAlcohol);
  console.log(addExplain);

  const navigate = useNavigate();
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
