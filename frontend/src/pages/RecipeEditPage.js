import Title from "../components/common/Title";
import RecipeTitleImgColor from "../components/recipe/RecipeTitleImgColor";
import RecipeExplain from "../components/recipe/RecipeExplain";
import RecipeSubmit from "../components/recipe/RecipeSubmit";
import { AddRecipeState } from "../store/recipe";
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
      const res = await axios.get(`http://localhost:4000/RecipeList?rno=${id}`);
      setRecipe(res.data[0]);
    } catch (error) {
      return error.message;
    }
  };

  const setItem = useSetRecoilState(AddRecipeState);
  const setAddImg = useSetRecoilState(AddRecipeState);
  const setAddName = useSetRecoilState(AddRecipeState);
  const setAddColor = useSetRecoilState(AddRecipeState);
  const setAddAlcohol = useSetRecoilState(AddRecipeState);
  const setAddExplain = useSetRecoilState(AddRecipeState);

  useEffect(() => {
    GetRecipe();
  }, []);

  setItem((prev) => {
    if (Recipe.additem) {
      return {
        ...prev,
        addItem: Recipe.additem.map((item) => ({
          addLength: item.addlength,
          addName: item.addname,
          addAmount: item.addamount,
          addUnit: item.addunit,
        })),
      };
    }
    return prev;
  });

  console.log(Recipe.item);

  setAddImg((prev) => ({
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
