import Title from "../components/common/Title";
import RecipeTitleImgColor from "../components/recipe/RecipeTitleImgColor";
import RecipeExplain from "../components/recipe/RecipeExplain";
import RecipeSubmit from "../components/recipe/RecipeSubmit";
import { useEffect } from "react";

const RecipeWritePage = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeTitleImgColor Title={"새 레시피 작성"}></RecipeTitleImgColor>
      </section>
      <section>
        <RecipeExplain></RecipeExplain>
      </section>
      <section>
        <RecipeSubmit actionType="post"></RecipeSubmit>
      </section>
    </main>
  );
};

export default RecipeWritePage;
