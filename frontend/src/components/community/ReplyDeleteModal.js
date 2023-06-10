import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import { deleteReply } from "../../api/community";

const ReplyDeleteModal = ({ handleClose, replyId, postId }) => {
  const queryClient = useQueryClient();
  const setToastState = useSetRecoilState(toastState);
  const { mutate } = useMutation({
    mutationFn: deleteReply,
    onError: (e) => {
      setToastState({
        show: true,
        message: "삭제에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    },
    onSuccess: async () => {
      handleClose();
      await queryClient.invalidateQueries(["community detail", { id: postId }]);
      setToastState({
        show: true,
        message: "삭제가 완료되었습니다.",
        type: "success",
      });
    },
  });
  return (
    <Modal
      title="댓글 삭제"
      content="정말 댓글을 삭제하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => mutate(replyId)}
    ></Modal>
  );
};

export default ReplyDeleteModal;
