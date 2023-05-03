import Title from "../components/common/Title";
import RecipeTitleImgColor from "../components/recipe/RecipeTitleImgColor";
import RecipeExplain from "../components/recipe/RecipeExplain";
import RecipeSubmit from "../components/recipe/RecipeSubmit";

const RecipeWritePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeTitleImgColor></RecipeTitleImgColor>
      </section>
      <section>
        <RecipeExplain></RecipeExplain>
      </section>
      <section>
        <RecipeSubmit></RecipeSubmit>
      </section>
    </main>
  );
};

export default RecipeWritePage;
