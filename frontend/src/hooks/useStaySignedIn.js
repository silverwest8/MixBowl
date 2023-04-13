import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "../store/auth";
import { getTokens, getNewAccessToken, removeTokens } from "../utils/token";
import { request } from "../api/instance";

export const useStaySignedIn = () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
    const { refreshToken, accessToken } = getTokens();
    if (refreshToken && accessToken) {
      request.defaults.headers.common.Authorization = accessToken;
      request.defaults.headers.common.refresh = refreshToken;
      if (getNewAccessToken()) {
        setAuthState({ isLoggedin: true });
      } else {
        removeTokens();
        setAuthState({ isLoggedin: false });
      }
    } else {
      request.defaults.headers.common.Authorization = "";
      request.defaults.headers.common.refresh = "";
      setAuthState({ isLoggedin: false });
    }
  }, []);
};
