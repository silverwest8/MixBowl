import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipePost = () => {
  return (
    <>
      <Link to="/writerecipe">
        <Button>
          <FaEdit></FaEdit>
          <p>새 레시피 등록</p>
        </Button>
      </Link>
    </>
  );
};

const Button = styled.button`
  width: 8.75rem;
  height: 2.25rem;
  border: 2px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 2.25rem;
  margin-bottom: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: -2rem;
  float: right;
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

export default RecipePost;
