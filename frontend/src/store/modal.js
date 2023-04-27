import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: {
    Component: null,
    props: {},
  },
});
