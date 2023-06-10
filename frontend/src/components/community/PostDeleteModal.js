import { useMutation } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import { deletePost } from "../../api/community";
import { useNavigate } from "react-router-dom";

const PostDeleteModal = ({ handleClose, id }) => {
  const setToastState = useSetRecoilState(toastState);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onError: (e) => {
      setToastState({
        show: true,
        message: "게시글 삭제에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    },
    onSuccess: () => {
      setToastState({
        show: true,
        message: "게시글이 삭제되었습니다.",
        type: "success",
      });
      handleClose();
      navigate("/community/board");
    },
  });
  return (
    <Modal
      title="게시글을 정말 삭제하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => mutate(id)}
    ></Modal>
  );
};

export default PostDeleteModal;
