import { getAccessToken } from "../utils/token";
import axios from "axios";

// 임시 api들

export const withdrawal = async () => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/users`);
  return data;
};

export const nameChange = async (checkname) => {
  const token = getAccessToken();
  console.log("checkname is ", checkname.uname.checkname);
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.put(`/api/users`, {
    nickname: checkname.uname.checkname,
  });
  console.log("answer is ", data);
  return data;
};

export const checkBartender = async ({
  name,
  birth,
  qualification,
  issueDate,
  lcsMngNo,
}) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const issueDateRe = issueDate.toString().replaceAll("-", "");
  console.log("issureDate is ", issueDateRe);

  const { data } = await axios.put("/api/users/checkbartender", {
    name,
    birth,
    qualification,
    issueDate: issueDateRe,
    lcsMngNo,
  });
  console.log("answeris ", data);
  return data;
};
