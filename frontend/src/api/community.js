import { getAccessToken } from "../utils/token";
import axios from "axios";

export const reportCommunity = async (id, report) => {
  const { data } = await axios.post(`/api/communities/report/${id}`, {
    report,
  });

  return data;
};

export const postCommunity = async ({
  title,
  content,
  category,
  image,
  likes,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title,
      content,
      likes,
    })
  );
  for (let i = 0; i < image.length; i++) {
    formData.append("files", image[i].file);
  }
  console.log("form is ", formData);
  const values = formData.values();
  for (const pair of values) {
    console.log(pair);
  }
  const { data } = await axios.post(
    `/api/communities?category=${category}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const deleteReply = async (id) => {
  const { data } = await axios.delete(`/api/communities/reply/${id}`);
  return data;
};

export const deletePost = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/users`);
  return data;
};

export const editCommunity = async ({
  like,
  content,
  title,
  category,
  id,
  files,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      like: Number(like),
      content,
      title,
      category: Number(category),
    })
  );
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].file);
  }
  const values = formData.values();
  for (const pair of values) {
    console.log(pair);
  }
  const { data } = await axios.post(`/api/communities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getAllRecipe = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get("/api/communities/list/cocktails");
  return data;
};
