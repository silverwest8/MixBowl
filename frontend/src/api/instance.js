import axios from "axios";
import { Cookies } from "react-cookie";
import { getNewAccessToken } from "../utils/token";

export const cookies = new Cookies();

export const request = axios.create({
  baseURL: "/api",
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;
    if (response.status === 401 && !originalRequest.url.includes("refresh")) {
      await getNewAccessToken();
      return axios(originalRequest);
    } else throw error;
  }
);

export class API {
  constructor(root) {
    this.root = root;
  }

  getUri(path) {
    return this.root + path;
  }
}
