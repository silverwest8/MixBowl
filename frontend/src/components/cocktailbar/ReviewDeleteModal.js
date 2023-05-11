import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { deleteReview } from "../../api/cocktailbar";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";

const ReviewDeleteModal = ({ handleClose, reviewId, placeId }) => {
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onError: (e) => {
      setToastState({
        show: true,
        message: "리뷰 삭제에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cocktail bar review", placeId]);
      setToastState({
        show: true,
        message: "리뷰가 삭제되었습니다.",
        type: "success",
      });
      handleClose();
    },
  });
  return (
    <Modal
      title="리뷰를 삭제하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => mutate(reviewId)}
    ></Modal>
  );
};

export default ReviewDeleteModal;
