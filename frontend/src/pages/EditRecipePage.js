import Title from "../components/common/Title";
import RecipeEdit from "../components/recipe/RecipeEdit";

const EditRecipePage = () => {
  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeEdit></RecipeEdit>
      </section>
    </main>
  );
};

export default EditRecipePage;
