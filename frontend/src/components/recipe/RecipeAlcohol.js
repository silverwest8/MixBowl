import Modal from "../common/Modal";

const RecipeAlcohol = ({ handleClose }) => {
  return (
    <Modal content="원하는 도수를 선택하세요" handleClose={handleClose}></Modal>
  );
};

export default RecipeAlcohol;
