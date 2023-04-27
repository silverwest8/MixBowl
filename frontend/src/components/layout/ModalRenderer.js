import { useRecoilValue } from "recoil";
import { modalState } from "../../store/modal";

const ModalRenderer = () => {
  const { Component, props } = useRecoilValue(modalState);
  return Component ? <Component {...props} /> : null;
};

export default ModalRenderer;
