import { useState } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import Textarea from "../common/Textarea";
import Rating from "@mui/material/Rating";
import styled from "styled-components";
import ImageUpload from "../common/ImageUpload";
import { useRecoilValue } from "recoil";
import { imageListState } from "../../store/image";

const KEYWORDS = [
  {
    id: 1,
    icon: "👍",
    keyword: "술이 맛있어요",
  },
  {
    id: 2,
    icon: "🍹",
    keyword: "술이 다양해요",
  },
  {
    id: 3,
    icon: "🍸",
    keyword: "혼술하기 좋아요",
  },
  {
    id: 4,
    icon: "🙌",
    keyword: "메뉴가 다양해요",
  },
  {
    id: 5,
    icon: "🍽️",
    keyword: "음식이 맛있어요",
  },
  {
    id: 6,
    icon: "🌃",
    keyword: "분위기가 좋아요",
  },
  {
    id: 7,
    icon: "😀",
    keyword: "직원이 친절해요",
  },
  {
    id: 8,
    icon: "🗣️",
    keyword: "대화하기 좋아요",
  },
  { id: 9, icon: "💵", keyword: "가성비가 좋아요" },
];

const ReviewModal = ({ handleClose, name, id }) => {
  const [inputs, setInputs] = useState({
    rating: 0,
    keyword: [],
    detail: "",
  });
  const { rating, keyword, detail } = inputs;
  const { urls, files } = useRecoilValue(imageListState);
  const [detailMsg, setDetailMsg] = useState("");
  const [ratingMsg, setRatingMsg] = useState("");
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
    // review POST API 호출하는 부분
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          rating: Number(rating),
          detail,
          keyword,
        })
      );
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i].file);
      }
      /* form data 확인 */
      const values = formData.values();
      for (const pair of values) {
        console.log(pair);
      }
      // const { data } = await axios.post(`/api/review/create/${id}`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // /* TODO: 성공 로직 */
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
    // handleClose();
  };
  return (
    <Modal
      handleClose={handleClose}
      onCancel={handleClose}
      onSubmit={onSubmit}
      title="리뷰 작성"
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
              {KEYWORDS.slice(0, 5).map(({ icon, keyword, id }) => (
                <KeywordButton
                  key={keyword}
                  icon={icon}
                  keyword={keyword}
                  onChange={changeKeyword}
                  id={id}
                />
              ))}
            </div>
          </section>
          <section>
            <h3>매장</h3>
            <div className="keyword-list">
              {KEYWORDS.slice(5).map(({ icon, keyword, id }) => (
                <KeywordButton
                  key={keyword}
                  icon={icon}
                  keyword={keyword}
                  onChange={changeKeyword}
                  id={id}
                />
              ))}
            </div>
          </section>
        </KeywordWrapper>
      </KeywordSelection>
      <Textarea
        value={detail}
        name="detail"
        cols={8}
        onChange={onChange}
        message={detailMsg}
        messageType="error"
        placeholder="칵테일 가게에서 느낀 점을 자유롭게 작성해주세요."
      />
      <ImageUpload />
    </Modal>
  );
};

const KeywordButton = ({ icon, keyword, onChange, id }) => {
  const [select, setSelect] = useState(false);
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
