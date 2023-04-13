import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "../store/auth";
import { getTokens, getNewAccessToken } from "../utils/token";
import { request } from "../api/instance";

export const useStaySignedIn = () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
    const { refreshToken, accessToken } = getTokens();
    if (refreshToken && accessToken) {
      request.defaults.headers.common.Authorization = accessToken;
      if (getNewAccessToken()) {
        setAuthState({ isLoggedin: true });
      }
    } else {
      request.defaults.headers.common.Authorization = "";
      setAuthState({ isLoggedin: false });
    }
  }, []);
};
