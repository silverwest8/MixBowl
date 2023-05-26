import { atom, RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const searchState = atom({
  key: "searchState",
  default: "",
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

export const menuState = atom({
  key: "menuState",
  default: "",
});
