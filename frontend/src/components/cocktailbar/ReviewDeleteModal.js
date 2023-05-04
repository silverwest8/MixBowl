import { useMutation } from "@tanstack/react-query";
import Modal from "../common/Modal";
import { deleteReview } from "../../api/cocktailbar";

const ReviewDeleteModal = ({ handleClose, reviewId }) => {
  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data);
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
