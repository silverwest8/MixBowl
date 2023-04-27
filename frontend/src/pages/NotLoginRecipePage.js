import Title from "../components/common/Title";
import RecipeFooter from "../components/recipe/RecipeFooter";
import RecipeSearch from "../components/recipe/RecipeSearch";
import RecipeCard from "../components/recipe/RecipeCard";

const NotLoginRecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeSearch placeholder="로그인 이후 검색이 가능합니다!" />
      </section>
      <section>
        <RecipeCard></RecipeCard>
      </section>
      <section>
        <RecipeFooter></RecipeFooter>
      </section>
    </main>
  );
};

export default NotLoginRecipePage;
