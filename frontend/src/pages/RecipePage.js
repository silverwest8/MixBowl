import Title from "../components/common/Title";
import RecipePostButton from "../components/recipe/RecipePostButton";
import RecipeSearch from "../components/recipe/RecipeSearch";
import RecipeCard from "../components/recipe/RecipeCard";
import RecipeButton from "../components/recipe/RecipeButton";
import styled from "styled-components";

const RecipePage = () => {
  return (
    <Main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeSearch placeholder="원하는 칵테일 레시피를 검색해보세요" />
      </section>
      <section>
        <RecipeButton />
      </section>
      <section>
        <RecipeCard></RecipeCard>
      </section>
      <section>
        <RecipePostButton></RecipePostButton>
      </section>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto 5rem;
  padding: 0 1rem;
`;

export default RecipePage;
