import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Textarea from "../common/Textarea";
import Rating from "@mui/material/Rating";
import styled from "styled-components";
import ImageUpload from "../common/ImageUpload";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { imageFileListState } from "../../store/imageFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReview, postReview } from "../../api/cocktailbar";
import { toastState } from "../../store/toast";
import { getKeywords } from "../../utils/keyword";

const keywords = getKeywords();

const ReviewModal = ({
  handleClose,
  name,
  placeId,
  reviewId,
  defaultInputs,
  defaultFiles,
}) => {
  const [inputs, setInputs] = useState(
    defaultInputs || {
      rating: 0,
      keyword: [],
      detail: "",
    }
  );
  const { rating, keyword, detail } = inputs;
  const files = useRecoilValue(imageFileListState);
  const [detailMsg, setDetailMsg] = useState("");
  const [ratingMsg, setRatingMsg] = useState("");
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const { mutate: mutatePost } = useMutation({
    mutationFn: postReview,
    onError: (e) => {
      setToastState({
        show: true,
        message: "리뷰 등록에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cocktail bar review", placeId]);
      setToastState({
        show: true,
        message: "리뷰가 등록되었습니다.",
        type: "success",
      });
      handleClose();
    },
  });
  const { mutate: mutateEdit } = useMutation({
    mutationFn: editReview,
    onError: (e) => {
      setToastState({
        show: true,
        message: "리뷰 수정에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cocktail bar review", placeId]);
      setToastState({
        show: true,
        message: "리뷰가 수정되었습니다.",
        type: "success",
      });
      handleClose();
    },
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const changeKeyword = (id) => {
    if (keyword.find((item) => item === id)) {
      setInputs((state) => ({
        ...state,
        keyword: state.keyword.filter((item) => item !== id),
      }));
      return true;
    } else if (keyword.length < 3) {
      setInputs((state) => ({
        ...state,
        keyword: state.keyword.concat([id]),
      }));
      return true;
    }
    return false;
  };
  const onSubmit = async () => {
    if (rating === 0) {
      setRatingMsg("* 0점은 평가는 불가능합니다.");
      setDetailMsg("");
      return;
    }
    if (detail === "") {
      setDetailMsg("리뷰를 작성해주세요.");
      setRatingMsg("");
      return;
    }
    if (reviewId) {
      mutateEdit({
        placeId,
        rating,
        keyword,
        detail,
        files,
        reviewId,
      });
    } else {
      mutatePost({
        placeId,
        rating,
        keyword,
        detail,
        files,
      });
    }
  };

  useEffect(() => {
    if (Number(rating) > 0) {
      setRatingMsg("");
    }
  }, [rating]);

  return (
    <Modal
      handleClose={handleClose}
      onCancel={handleClose}
      onSubmit={onSubmit}
      title={reviewId ? "리뷰 수정" : "리뷰 작성"}
    >
      <RatingWrapper>
        <p className="place-name">{name}</p>
        <Rating
          name="rating"
          precision={0.5}
          value={Number(rating)}
          onChange={onChange}
        />
        {ratingMsg && <p className="message">{ratingMsg}</p>}
      </RatingWrapper>
      <KeywordSelection>
        <p>이 가게에 어울리는 키워드를 골라주세요. (최대 3개)</p>
        <KeywordWrapper>
          <section>
            <h3>술/음식</h3>
            <div className="keyword-list">
              {keywords.slice(0, 5).map(({ icon, value, id }) => (
                <KeywordButton
                  key={value}
                  icon={icon}
                  keyword={value}
                  onChange={changeKeyword}
                  id={id}
                  selected={keyword.includes(id)}
                />
              ))}
            </div>
          </section>
          <section>
            <h3>매장</h3>
            <div className="keyword-list">
              {keywords.slice(5).map(({ icon, value, id }) => (
                <KeywordButton
                  key={value}
                  icon={icon}
                  keyword={value}
                  onChange={changeKeyword}
                  id={id}
                  selected={keyword.includes(id)}
                />
              ))}
            </div>
          </section>
        </KeywordWrapper>
      </KeywordSelection>
      <Textarea
        value={detail}
        name="detail"
        rows={8}
        onChange={onChange}
        message={detailMsg}
        messageType="error"
        placeholder="칵테일 가게에서 느낀 점을 자유롭게 작성해주세요."
      />
      <ImageUpload defaultFiles={defaultFiles} />
    </Modal>
  );
};

const KeywordButton = ({ icon, keyword, onChange, id, selected }) => {
  const [select, setSelect] = useState(selected);
  return (
    <button
      onClick={() => {
        if (onChange(id)) {
          setSelect((state) => !state);
        }
      }}
      className={select ? "select" : ""}
    >
      {icon} {keyword}
    </button>
  );
};

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  .place-name {
    font-weight: 700;
    font-size: 0.875rem;
    margin-bottom: 0.2rem;
    color: ${({ theme }) => theme.color.lightGray};
  }
  .message {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.red};
  }
`;

const KeywordSelection = styled.div`
  margin-bottom: 1.25rem;
  p {
    font-size: 0.875rem;
  }
`;

const KeywordWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.625rem;
  flex-wrap: wrap;
  h3 {
    font-weight: 700;
    font-size: 0.875rem;
  }
  section {
    flex-grow: 1;
  }
  .keyword-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-top: 0.625rem;
  }
  button {
    border: 1px solid black;
    text-align: center;
    font-weight: 500;
    font-size: 0.875rem;
    border-radius: 4px;
    padding: 0.5rem 2rem;
    &.select {
      background-color: black;
      border-color: black;
    }
  }
`;

export default ReviewModal;
