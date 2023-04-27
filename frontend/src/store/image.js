import { atom } from "recoil";
export const imageListState = atom({
  key: "imageListState",
  default: {
    urls: [],
    files: [],
  },
});
