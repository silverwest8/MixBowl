import { useMutation } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { withdrawal } from "../../api/mypage";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import { removeTokens } from "../../utils/token";

const WithdrawModal = ({ handleClose }) => {
  const setToastState = useSetRecoilState(toastState);
  const { mutate } = useMutation({
    mutationFn: withdrawal,
    onError: (e) => {
      setToastState({
        show: true,
        message: "탈퇴에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.log(e);
    },
    onSuccess: () => {
      setToastState({
        show: true,
        message: "탈퇴가 완료되었습니다.",
        type: "success",
      });
      handleClose();
      removeTokens();
      window.location.reload();
      window.location.replace("/login");
    },
  });
  return (
    <Modal
      title="회원 탈퇴"
      content="정말 탈퇴하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => mutate()}
    ></Modal>
  );
};

export default WithdrawModal;
