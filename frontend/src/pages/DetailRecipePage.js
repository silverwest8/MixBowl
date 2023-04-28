import Title from "../components/common/Title";
import RecipeDetailCard from "../components/recipe/RecipeDetailCard";

const DetailRecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeDetailCard></RecipeDetailCard>
      </section>
      <section>리뷰 작성하기 닉네임 리뷰리뷰</section>
    </main>
  );
};

export default DetailRecipePage;
