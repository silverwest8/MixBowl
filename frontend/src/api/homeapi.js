import { getAccessToken } from "../utils/token";
import axios from "axios";

export const getQuestion = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get(`/api/home/question`);
  return data;
};

export const getCocktail = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get(`/api/home/cocktail`);
  return data;
};

export const getCommunity = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.get(`/api/home/community`);
  return data;
};
