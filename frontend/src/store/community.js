import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const menuState = atom({
  key: "menuState",
  default: {
    menu: "",
  },
});

export const AddPostingState = atom({
  key: "AddPostingState",
  default: {
    addImg: "",
    addTitle: "",
    addContent: "",
    addLike: 0,
  },
});

export const AddCommunityImgState = atom({
  key: "AddCommunityImgState",
  default: "",
});

export const CommunityReportState = atom({
  key: "CommunityReportState",
  default: 0,
});
