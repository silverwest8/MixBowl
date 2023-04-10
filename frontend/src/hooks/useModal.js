import { useSetRecoilState } from "recoil";
import { modalState } from "../store/modal";

export const useModal = () => {
  const setModalState = useSetRecoilState(modalState);
  const openModal = (Component, props) => {
    setModalState({
      Component,
      props,
    });
  };

  const closeModal = () => {
    setModalState({
      Component: null,
      props: {},
    });
  };

  return { openModal, closeModal };
};
