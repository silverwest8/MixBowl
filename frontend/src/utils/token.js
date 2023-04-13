import { cookies, request } from "../api/instance";
import { userAPI } from "../api/user";

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "access_token";

export const setToken = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    request.defaults.headers.common.Authorization = accessToken;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    request.defaults.headers.common.refresh = refreshToken;
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
  request.defaults.headers.common.refresh = "";
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  request.defaults.headers.common.Authorization = "";
};

export const getAccessToken = () =>
  window.localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => cookies.get(REFRESH_TOKEN_KEY);

export const getTokens = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
});

export const getNewAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const { data } = await userAPI.refresh(refreshToken);
    setToken({ accessToken: data.accessToken });
    return true;
  } catch (e) {
    if (e.response.data.message.includes("not expired")) {
      return true;
    } else return false;
  }
};
