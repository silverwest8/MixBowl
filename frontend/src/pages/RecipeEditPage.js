import Title from "../components/common/Title";
import RecipeTitleImgColor from "../components/recipe/RecipeTitleImgColor";
import RecipeExplain from "../components/recipe/RecipeExplain";
import RecipeSubmit from "../components/recipe/RecipeSubmit";
import { AddRecipeState, AddRecipeImgState } from "../store/recipe";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const RecipeEditPage = () => {
  const [Recipe, setRecipe] = useState([]);
  const params = useParams();
  const id = params.id;
  const GetRecipe = async () => {
    try {
      const { data } = await axios.get(`/api/recipes/${id}`);
      setRecipe(data.data);
    } catch (error) {
      return error.message;
    }
  };

  const setItem = useSetRecoilState(AddRecipeState);
  const setImg = useSetRecoilState(AddRecipeImgState);
  const setAddName = useSetRecoilState(AddRecipeState);
  const setAddColor = useSetRecoilState(AddRecipeState);
  const setAddAlcohol = useSetRecoilState(AddRecipeState);
  const setAddExplain = useSetRecoilState(AddRecipeState);

  useEffect(() => {
    GetRecipe();
  }, []);

  setItem((prev) => {
    if (Recipe.ingred) {
      return {
        ...prev,
        addItem: Recipe.ingred.map((item) => ({
          addName: item.name,
          addAmount: item.amount,
          addUnit: item.unit,
        })),
      };
    }
    return prev;
  });

  setImg((prev) => ({
    ...prev,
    addImg: Recipe.image_path,
  }));

  setAddName((prev) => ({
    ...prev,
    addName: Recipe.name,
  }));

  setAddColor((prev) => ({
    ...prev,
    addColor: Recipe.color,
  }));

  setAddAlcohol((prev) => ({
    ...prev,
    addAlcohol: Recipe.alcohol,
  }));

  setAddExplain((prev) => ({
    ...prev,
    addExplain: Recipe.explain,
  }));

  console.log(Recipe);

  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeTitleImgColor
          Title={"레시피 수정"}
          Color={Recipe.color}
        ></RecipeTitleImgColor>
      </section>
      <section>
        <RecipeExplain Alcohol={Recipe.alcohol}></RecipeExplain>
      </section>
      <section>
        <RecipeSubmit></RecipeSubmit>
      </section>
    </main>
  );
};

export default RecipeEditPage;
