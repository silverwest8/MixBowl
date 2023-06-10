import { getAccessToken } from "./token";

export const getLinkWithAuth = (link) => {
  const token = getAccessToken();
  return token ? link : `/login?return_url=${link}`;
};
