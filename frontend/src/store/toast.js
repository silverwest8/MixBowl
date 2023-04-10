import { atom, selector } from "recoil";

export const toastState = atom({
  key: "toastState",
  default: {
    show: false,
    message: "",
    type: "success", // or error
    ms: 0,
  },
});

export const toastShowState = selector({
  key: "toastShowState",
  get: ({ get }) => {
    const state = get(toastState);
    return state.show;
  },
});
