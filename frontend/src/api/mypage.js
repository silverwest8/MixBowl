import { getAccessToken } from "../utils/token";
import axios from "axios";

export const withdrawal = async (id) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/reviews/${id}`);
  return data;
};
