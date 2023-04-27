import Title from "../components/common/Title";
import RecipeWrite from "../components/recipe/RecipeWrite";

const WriteRecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeWrite></RecipeWrite>
      </section>
    </main>
  );
};

export default WriteRecipePage;
