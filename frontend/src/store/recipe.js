import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: "",
});

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
    alcohol: "",
  },
});

export const sortState = atom({
  key: "sortState",
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
    addItem: [
      {
        addLength: 1,
        addName: "",
        addAmount: null,
        addUnit: "",
      },
      {
        addLength: 2,
        addName: "",
        addAmount: null,
        addUnit: "",
      },
    ],
    addAlcohol: "",
    addExplain: "",
  },
});

export const AddRecipeImgState = atom({
  key: "AddRecipeImgState",
  default: "",
});

export const RecipeRoportState = atom({
  key: "RecipeRoportState",
  default: 0,
});
