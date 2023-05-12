import axios from "axios";

export const postRecipe = async ({
  name,
  color,
  ingred,
  alcoholic,
  instruction,
  image,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      name,
      color,
      ingred,
      alcoholic,
      instruction,
    })
  );

  for (let i = 0; i < image.length; i++) {
    formData.append("image", image[i]);
  }

  /* form data 확인 */
  const values = formData.values();
  for (const pair of values) {
    console.log(pair);
  }
  const { data } = await axios.post(`/api/recipes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteReipe = async (id) => {
  const { data } = await axios.delete(`/api/recipes/${id}`);
  return data;
};
