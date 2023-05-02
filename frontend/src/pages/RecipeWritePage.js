import styled from "styled-components";
import Title from "../components/common/Title";
import RecipeWriteA from "../components/recipe/RecipeWriteA";
import RecipeWriteB from "../components/recipe/RecipeWriteB";

const RecipeWritePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeWriteA></RecipeWriteA>
      </section>
      <RecipeBoxB>
        <RecipeWriteB></RecipeWriteB>
      </RecipeBoxB>
    </main>
  );
};

const RecipeBoxB = styled.div`
  width: 40vw;
  margin: auto;
  @media screen and (max-width: 840px) {
    width: 80vw;
  }
`;

export default RecipeWritePage;
