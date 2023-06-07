import { getAccessToken } from "../utils/token";
import axios from "axios";

export const getCocktailBar = async ({ queryKey }) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get(`/api/reviews/bar/${queryKey[1]}`);
  return data;
};

export const getReview = async ({ queryKey }) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get(
    `/api/reviews/bar/reviewlist/${queryKey[1]}`
  );
  return data;
};

export const getCocktailBarList = async ({ queryKey }) => {
  console.log("call API...");
  const accessToken = getAccessToken();
  if (accessToken) axios.defaults.headers.common.Authorization = accessToken;
  const { data } = await axios.get(
    `/api/reviews/barlist?query=${queryKey[2] || "칵테일 바"}&x=${
      queryKey[1].lng
    }&y=${queryKey[1].lat}&radius=${queryKey[3]}&sort=accuracy`
  );
  return data;
};

export const postReview = async ({
  rating,
  detail,
  keyword,
  files,
  placeId,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      rating: Number(rating),
      detail,
      keyword,
      placeId,
    })
  );
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].file);
  }
  /* form data 확인 */
  const values = formData.values();
  for (const pair of values) {
    console.log("review pair ", pair);
  }
  const { data } = await axios.post("/api/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await axios.delete(`/api/reviews/${id}`);
  return data;
};

export const editReview = async ({
  reviewId,
  rating,
  detail,
  keyword,
  files,
  placeId,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      rating: Number(rating),
      detail,
      keyword,
      placeId,
    })
  );
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].file);
  }
  /* form data 확인 */
  const values = formData.values();
  for (const pair of values) {
    console.log(pair);
  }
  const { data } = await axios.post(`/api/reviews/${reviewId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
