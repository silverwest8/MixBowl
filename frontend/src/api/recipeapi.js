import axios from "axios";

export const reportRecipe = async (id, report) => {
  const { data } = await axios.post(`/api/recipes/report/${id}`, {
    report,
  });

  return data;
};

export const likeRecipe = async (id, liked, like) => {
  const { data } = await axios.post(`/api/recipes/like/${id}`, {
    liked,
    like,
  });

  return data;
};

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

  if (image && image.length > 0) {
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
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

export const editRecipe = async ({
  recipeId,
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

  if (image && image.length > 0) {
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
  }

  /* form data 확인 */
  const values = formData.values();
  for (const pair of values) {
    console.log(pair);
  }
  const { data } = await axios.post(
    `/api/recipes/update/${recipeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const deleteReipe = async (id) => {
  const { data } = await axios.delete(`/api/recipes/${id}`);
  return data;
};
