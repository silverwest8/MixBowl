import DropdownMenu from "../common/DropdownMenu";
import MemberBadge from "../common/MemberBadge";
import ReviewModal from "./ReviewModal";
import { useModal } from "../../hooks/useModal";
import { FaPen } from "react-icons/fa";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ReviewList = ({ cnt, reviewList, name }) => {
  const params = useParams();
  const { openModal, closeModal } = useModal();
  return (!params.id && cnt !== 0) || params.id ? (
    <div>
      <ReviewHeader>
        <div className="review-info">
          <h2>리뷰</h2>
          <span>{cnt}개</span>
        </div>

        {params.id && (
          <Button
            onClick={() => {
              openModal(ReviewModal, {
                handleClose: closeModal,
                name,
              });
            }}
          >
            <FaPen /> 리뷰 작성하기
          </Button>
        )}
      </ReviewHeader>
      <List>
        {reviewList.map((review) => (
          <div key={review.REVIEW_ID} className="review-item">
            <div className="item-header">
              <div className="user-info">
                <span>{review.UNO_USER.NICKNAME}</span>
                <MemberBadge level={review.UNO_USER.LEVEL} />
              </div>
              {review.UNO_USER.ISWRITER && <DropdownMenu />}
            </div>
            <p>&ldquo;{review.TEXT}&rdquo;</p>
            <span className="date">
              {review.createdAt.split("T")[0].replaceAll("-", ".")}
            </span>
          </div>
        ))}
      </List>
    </div>
  ) : null;
};

const Button = styled.button`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.primaryGold};
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  svg {
    font-size: 0.8rem;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  .review-info {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    h2 {
      font-weight: bold;
    }
    span {
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.8rem;
  .review-item {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    font-weight: 400;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.primaryGold};
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
      }
    }
    p {
      font-size: 1rem;
      font-weight: normal;
      line-height: 150%;
      margin: 0.5rem 0;
    }
    .date {
      color: ${({ theme }) => theme.color.lightGray};
      align-self: flex-end;
    }
  }
`;

export default ReviewList;
