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
  const accessToken = getAccessToken();
  if (accessToken)
    axios.defaults.headers.common.Authorization = getAccessToken();
  if (queryKey[1] !== null) {
    const { data } = await axios.get(
      `/api/reviews/barlist?query=${queryKey[2] || "칵테일 바"}&x=${
        queryKey[1].lng
      }&y=${queryKey[1].lat}&radius=${queryKey[3]}&sort=accuracy`
    );
    return data;
  } else return null;
};
