import { atom } from "recoil";
export const mapState = atom({
  key: "mapState",
  default: {
    data: null,
    center: {
      lat: 37.498095,
      lng: 127.02761,
    },
    location: "",
    radius: 1000,
  },
});
