import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "../store/auth";
import { getTokens, getNewAccessToken, removeTokens } from "../utils/token";
import axios from "axios";

export const useStaySignedIn = () => {
  const setAuthState = useSetRecoilState(authState);
  useEffect(() => {
    const { refreshToken, accessToken } = getTokens();
    if (refreshToken && accessToken) {
      if (getNewAccessToken()) {
        setAuthState({ isLoggedin: true });
      } else {
        removeTokens();
        setAuthState({ isLoggedin: false });
      }
    } else {
      axios.defaults.headers.common.Authorization = undefined;
      axios.defaults.headers.common.refresh = undefined;
      setAuthState({ isLoggedin: false });
    }
  }, []);
};
