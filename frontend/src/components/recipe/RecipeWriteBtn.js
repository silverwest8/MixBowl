import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeWriteBtn = () => {
  return (
    <>
      <Link to="/recipe/write">
        <Button>
          <FaEdit></FaEdit>
          <p>새 레시피 등록</p>
        </Button>
      </Link>
    </>
  );
};

const Button = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 8.75rem;
  height: 2.25rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.color.primaryGold};
`;

export default RecipeWriteBtn;
