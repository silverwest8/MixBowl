import Modal from "../common/Modal";
import { alcoholState } from "../../store/recipe";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const RecipeAlcohol = ({ handleClose }) => {
  const [{ alcohol }, setAlcohol] = useRecoilState(alcoholState);
  const handleClick = (option) => () => {
    if (option === "낮음" && alcohol !== "낮음") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "낮음",
      }));
    } else if (option === "낮음" && alcohol === "낮음") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "",
      }));
    } else if (option === "중간" && alcohol !== "중간") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "중간",
      }));
    } else if (option === "중간" && alcohol === "중간") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "",
      }));
    } else if (option === "높음" && alcohol !== "높음") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "높음",
      }));
    } else if (option === "높음" && alcohol === "높음") {
      setAlcohol((prev) => ({
        ...prev,
        alcohol: "",
      }));
    }
    handleClose();
  };

  return (
    <Modal content="원하는 도수를 선택하세요" handleClose={handleClose}>
      <Button onClick={handleClick("낮음")}>
        {alcohol === "낮음" ? <FaCheckCircle></FaCheckCircle> : null} 낮음 (0
        ~15)
      </Button>
      <Button onClick={handleClick("중간")}>
        {alcohol === "중간" ? <FaCheckCircle></FaCheckCircle> : null} 중간 (6 ~
        15)
      </Button>
      <Button onClick={handleClick("높음")}>
        {alcohol === "높음" ? <FaCheckCircle></FaCheckCircle> : null} 높음 (16 ~
        99)
      </Button>
    </Modal>
  );
};

const Button = styled.button`
  width: 10rem;
  height: 2.25rem;
  border: 1px solid ${({ theme }) => theme.color.secondGold};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  margin-top: 1rem;
  svg {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default RecipeAlcohol;
