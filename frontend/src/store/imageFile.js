import { atom } from "recoil";
export const imageFileListState = atom({
  key: "imageFileListState",
  default: [], // { id: number, file: File }
});
