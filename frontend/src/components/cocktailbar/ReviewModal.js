import { useState } from "react";
import Modal from "../common/Modal";
import Textarea from "../common/Textarea";
import Rating from "@mui/material/Rating";

const ReviewModal = ({ handleClose, name }) => {
  const [inputs, setInputs] = useState({
    rating: 0,
    keyword: "",
    detail: "",
  });
  const { rating, keyword, detail } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const onSubmit = () => {};
  return (
    <Modal
      handleClose={handleClose}
      onCancel={handleClose}
      onSubmit={handleClose}
      title="리뷰 작성"
    >
      <div>
        <p>{name}</p>
        <Rating
          name="rating"
          precision={0.5}
          value={Number(rating)}
          onChange={onChange}
        />
      </div>
      <div>
        <p>이 가게에 어울리는 키워드를 골라주세요. (최대 3개)</p>
      </div>
      <Textarea
        value={detail}
        name="detail"
        onChange={onChange}
        placeholder="칵테일 가게에서 느낀 점을 자유롭게 작성해주세요."
      />
    </Modal>
  );
};

export default ReviewModal;
