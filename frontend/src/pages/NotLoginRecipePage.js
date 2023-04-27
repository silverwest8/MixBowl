import Title from "../components/common/Title";
import RecipeFooter from "../components/recipe/RecipeFooter";
import RecipeSearch from "../components/recipe/RecipeSearch";
import RecipeCard from "../components/recipe/RecipeCard";
import styled from "styled-components";

const NotLoginRecipePage = () => {
  return (
    <Main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeSearch placeholder="로그인 이후 검색이 가능합니다!" disabled />
      </section>
      <section>
        <RecipeCard></RecipeCard>
      </section>
      <section>
        <RecipeFooter></RecipeFooter>
      </section>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default NotLoginRecipePage;
