import { atom, RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const commentState = atom({
  key: "commentState",
  default: "",
});

export const AddPostingState = atom({
  key: "AddPostingState",
  default: {
    addTitle: "",
    addContent: "",
    addLike: 1,
    addCategory: 4,
    addCNO: null,
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
