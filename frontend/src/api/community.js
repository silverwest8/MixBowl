import { getAccessToken } from "../utils/token";
import axios from "axios";
import { toastState } from "../store/toast";
import { useSetRecoilState, useRecoilState } from "recoil";
import { commentState, checkEditState } from "../store/community";

export const reportCommunity = async (id, report) => {
  const { data } = await axios.post(`/api/communities/report/${id}`, {
    report,
  });

  return data;
};

export const postCommunity = async ({
  title,
  content,
  like,
  cno,
  category,
  image,
}) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title,
      content,
      like,
      cno,
    })
  );
  console.log("files is ", image);
  for (let i = 0; i < image.length; i++) {
    formData.append("files", image[i].file);
  }
  // console.log("form is ", formData);
  // const values = formData.values();
  // for (const pair of values) {
  //   console.log("pair is ", pair);
  // }
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

export const deletePost = async (id) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.delete(`/api/communities/${id}`);
  return data;
};

export const editCommunity = async ({
  like,
  content,
  title,
  category,
  cno,
  id,
  files,
}) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      title,
      content,
      like,
      category,
      cno,
    })
  );
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].file);
  }
  const values = formData.values();
  for (const pair of values) {
    console.log("pair is ", pair);
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
export const registerComment = async (id, comment) => {
  const token = getAccessToken();
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.post(`/api/communities/reply/${id}`, {
    content: comment,
  });
  return data;
};
export const editComment = async (id, comment) => {
  // console.log(e);
  const token = getAccessToken();
  console.log("editcomment id is ", id);
  axios.defaults.headers.common.Authorization = token;
  const { data } = await axios.put(`/api/communities/reply/${id}`, {
    content: comment,
  });
  console.log("edited comment is ", data);
  return data;
};

export const getDayMinuteCounter = (date) => {
  const moment = require("moment");
  if (!date) {
    return "";
  }

  const today = moment();
  const postingDate = moment(date);
  const dayDiff = postingDate.diff(today, "days");
  const hourDiff = postingDate.diff(today, "hours");
  const minutesDiff = postingDate.diff(today, "minutes");

  if (dayDiff === 0 && hourDiff === 0) {
    // 작성한지 1시간도 안지났을때
    const minutes = Math.ceil(-minutesDiff);
    return minutes + "분 전"; // '분' 로 표시
  }

  if (dayDiff === 0 && hourDiff <= 24) {
    // 작성한지 1시간은 넘었지만 하루는 안지났을때,
    const hour = Math.ceil(-hourDiff);
    return hour + "시간 전"; // '시간'으로 표시
  }

  return -dayDiff + "일 전"; // '일'로 표시
};
