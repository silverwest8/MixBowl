import axios from "axios";
import { cookies } from "./cookie";

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "access_token";

export const setToken = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = accessToken;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    axios.defaults.headers.common.refresh = refreshToken;
    const expires = new Date();
    expires.setDate(expires.getDate() + 13);
    cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires,
      secure: true,
    });
  }
};

export const removeTokens = () => {
  cookies.remove(REFRESH_TOKEN_KEY);
  axios.defaults.headers.common.refresh = "";
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  axios.defaults.headers.common.Authorization = "";
};

export const getAccessToken = () =>
  window.localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => cookies.get(REFRESH_TOKEN_KEY);

export const getTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (accessToken) {
    axios.defaults.headers.common.Authorization = accessToken;
  }
  if (refreshToken) {
    axios.defaults.headers.common.refresh = refreshToken;
  }
  return {
    accessToken,
    refreshToken,
  };
};

export const getNewAccessToken = async () => {
  try {
    const { data } = await axios.get("/api/user/refresh");
    setToken({ accessToken: data.accessToken });
    return true;
  } catch (e) {
    if (e.response.data.message.includes("not expired")) {
      return true;
    } else return false;
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error다");
    const { config: originalRequest, response } = error;
    console.log(error);
    if (response.status === 419 && !originalRequest.url.includes("refresh")) {
      if (getNewAccessToken()) {
        return axios(originalRequest);
      } else throw error;
    } else throw error;
  }
);
