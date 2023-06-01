import { atom } from "recoil";
export const mapState = atom({
  key: "mapState",
  default: {
    loading: false,
    data: null,
    center: {
      lat: 37.5878109,
      lng: 127.0017424,
    },
    location: "",
    addressInput: "",
    radius: 1000,
  },
});

export const addressInputState = atom({
  key: "addressInputState",
  default: "",
});
