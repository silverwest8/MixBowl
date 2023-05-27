import { getAccessToken } from "../utils/token";
import axios from "axios";

// 임시 api들

export const withdrawal = async (id) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/users`);
  return data;
};

export const nameChange = async (checkname) => {
  const token = getAccessToken();
  console.log("checkname is ", checkname);
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.put(`/api/users`, {
    checkname,
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
  const issueDateRe = issueDate.split("-");
  const realIssue = (
    issueDateRe[0] +
    issueDateRe[1] +
    issueDateRe[2]
  ).toString();
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      name,
      birth,
      qualification,
      issueDate: realIssue,
      lcsMngNo,
    })
  );
  // const values = formData.values();
  // for (const pair of values) {
  //   console.log("pair is ", pair);
  // }

  const { data } = await axios.put("/api/users/checkbartender", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("answeris ", data);
  return data;
};
