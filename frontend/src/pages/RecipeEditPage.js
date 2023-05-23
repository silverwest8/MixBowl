import Title from "../components/common/Title";
import RecipeTitleImgColor from "../components/recipe/RecipeTitleImgColor";
import RecipeExplain from "../components/recipe/RecipeExplain";
import RecipeSubmit from "../components/recipe/RecipeSubmit";
import { AddRecipeState, AddRecipeImgState } from "../store/recipe";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const RecipeEditPage = () => {
  const params = useParams();
  const id = params.id;
  const [item, setItem] = useRecoilState(AddRecipeState);
  const setPostImg = useSetRecoilState(AddRecipeImgState);
  const setAddImg = useSetRecoilState(AddRecipeState);
  const setAddName = useSetRecoilState(AddRecipeState);
  const [{ addColor }, setAddColor] = useRecoilState(AddRecipeState);
  const setAddAlcohol = useSetRecoilState(AddRecipeState);
  const setAddExplain = useSetRecoilState(AddRecipeState);
  const colorString = [];
  const token = localStorage.getItem("access_token");

  const GetImg = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const response = await axios.get(`/api/recipes/image/${id}`, {
        responseType: "blob",
      });

      const blobData = await response.data;
      const base64Image = URL.createObjectURL(blobData);

      setAddImg((prev) => ({
        ...prev,
        addImg: base64Image,
      }));

      const file = new File([blobData], "RecipeEdit.jpg", {
        type: response.headers["content-type"],
      });
      setPostImg(file);
    } catch (error) {
      return error.message;
    }
  };

  const GetRecipe = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const { data } = await axios.get(`/api/recipes/${id}`);

      setAddName((prev) => ({
        ...prev,
        addName: data.data.name,
      }));

      if (data.data.color.includes(1)) {
        colorString.push("red");
      }
      if (data.data.color.includes(2)) {
        colorString.push("orange");
      }
      if (data.data.color.includes(3)) {
        colorString.push("yellow");
      }
      if (data.data.color.includes(4)) {
        colorString.push("green");
      }
      if (data.data.color.includes(5)) {
        colorString.push("blue");
      }
      if (data.data.color.includes(6)) {
        colorString.push("purple");
      }
      if (data.data.color.includes(7)) {
        colorString.push("pink");
      }
      if (data.data.color.includes(8)) {
        colorString.push("black");
      }
      if (data.data.color.includes(9)) {
        colorString.push("brown");
      }
      if (data.data.color.includes(10)) {
        colorString.push("grey");
      }
      if (data.data.color.includes(11)) {
        colorString.push("white");
      }
      if (data.data.color.includes(12)) {
        colorString.push("transparent");
      }

      setAddColor((prev) => ({
        ...prev,
        addColor: colorString,
      }));

      setItem((prev) => {
        if (data.data.ingred) {
          return {
            ...prev,
            addItem: data.data.ingred.map((item) => ({
              addName: item.name,
              addAmount: item.amount,
              addUnit: item.unit,
            })),
          };
        }
        return prev;
      });

      if (data.data.alcoholic === 0) {
        setAddAlcohol((prev) => ({
          ...prev,
          addAlcohol: "낮음",
        }));
      }

      if (data.data.alcoholic === 1) {
        setAddAlcohol((prev) => ({
          ...prev,
          addAlcohol: "보통",
        }));
      }

      if (data.data.alcoholic === 2) {
        setAddAlcohol((prev) => ({
          ...prev,
          addAlcohol: "높음",
        }));
      }

      setAddExplain((prev) => ({
        ...prev,
        addExplain: data.data.instruction,
      }));
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    GetImg();
    GetRecipe();
  }, []);

  console.log(item);

  return (
    <main>
      <Title title="칵테일 레시피" />
      <section>
        <RecipeTitleImgColor
          Title={"레시피 수정"}
          Color={addColor}
        ></RecipeTitleImgColor>
      </section>
      <section>
        <RecipeExplain></RecipeExplain>
      </section>
      <section>
        <RecipeSubmit actionType="edit"></RecipeSubmit>
      </section>
    </main>
  );
};

export default RecipeEditPage;
