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
  key: "alcoholState",
  default: {
    min: 0,
    max: 0,
  },
});

export const arrState = atom({
  key: "arrState",
  default: {
    latest: true,
    recommendation: false,
  },
});

export const AddRecipeState = atom({
  key: "AddRecipeState",
  default: {
    addImg: "",
    addName: "",
    addColor: [],
    explain: "",
  },
});

export const AddItemState = atom({
  key: "AddItemState",
  default: {
    main: [
      {
        mainId: 1,
        mainName: "",
        mainAmount: null,
        mainUnit: "",
        mainHover: false,
      },
    ],
    sub: [
      {
        subId: 1,
        subName: "",
        subAmount: null,
        subnUnit: "",
        subHover: false,
      },
    ],
  },
});
