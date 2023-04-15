import Title from "../components/common/Title";
import RecipeFooter from "../components/recipe/RecipeFooter";
import RecipeSearch from "../components/recipe/RecipeSearch";
import RecipeCard from "../components/recipe/RecipeCard";

const RecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeSearch></RecipeSearch>
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

export default RecipePage;
