import Title from "../components/common/Title";
import RecipeDetailCard from "../components/recipe/RecipeDetailCard";
import RecipeComment from "../components/recipe/RecipeComment";
import { useEffect } from "react";

const DetailRecipePage = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeDetailCard></RecipeDetailCard>
      </section>
      <section>
        <RecipeComment></RecipeComment>
      </section>
    </main>
  );
};

export default DetailRecipePage;
