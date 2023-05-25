import { getAccessToken } from "../utils/token";
import axios from "axios";

// 임시 api들

export const withdrawal = async (id) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/withdraw/${id}`);
  return data;
};

export const nameChange = async (checkname) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.put(`/api/users`, {
    checkname,
  });
  return data;
};
