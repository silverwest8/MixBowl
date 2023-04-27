import Title from "../components/common/Title";
import RecipePost from "../components/recipe/RecipePost";
import RecipeSearch from "../components/recipe/RecipeSearch";
import RecipeCard from "../components/recipe/RecipeCard";
import RecipeButton from "../components/recipe/RecipeButton";

const RecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeSearch placholder="원하는 칵테일 레시피를 검색해보세요" />
      </section>
      <section>
        <RecipeButton />
      </section>
      <section>
        <RecipeCard></RecipeCard>
      </section>
      <section>
        <RecipePost></RecipePost>
      </section>
    </main>
  );
};

export default RecipePage;
