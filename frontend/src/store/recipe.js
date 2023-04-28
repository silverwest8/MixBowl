import { atom } from "recoil";

export const colorState = atom({
  key: "colorState",
  default: {
    red: false,
    pink: false,
    orange: false,
    black: false,
    yellow: false,
    brown: false,
    green: false,
    grey: false,
    blue: false,
    white: false,
    purple: false,
    transparent: false,
    no: true,
  },
});

export const alcoholState = atom({
  key: "alcoholState ",
  default: {
    min: 0,
    max: 0,
  },
});
