import { atom } from "recoil";
export const mapState = atom({
  key: "mapState",
  default: {
    data: null,
    center: null,
    location: "",
    radius: 1000,
  },
});
