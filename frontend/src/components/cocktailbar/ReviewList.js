import DropdownMenu from "../common/DropdownMenu";
import MemberBadge from "../common/MemberBadge";
import ReviewModal from "./ReviewModal";
import ImageSliderModal from "../common/ImageSliderModal";
import { useModal } from "../../hooks/useModal";
import { FaPen } from "react-icons/fa";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import ReviewDeleteModal from "./ReviewDeleteModal";
import { convertURLtoFile, getReviewImageUrl } from "../../utils/image";

const ReviewList = ({ cnt, reviewList, name, placeId }) => {
  const params = useParams();
  const { openModal, closeModal } = useModal();
  const onClickEditMenu = async (
    reviewId,
    { rating, keyword, detail, imageIds }
  ) => {
    const files = [];
    for (let i = 0; i < imageIds.length; i++) {
      const file = await convertURLtoFile(
        `/api/reviews/image/one?imageId=${imageIds[i]}`
      );
      files.push(file);
    }
    openModal(ReviewModal, {
      handleClose: closeModal,
      reviewId,
      placeId,
      name,
      defaultInputs: {
        rating,
        keyword,
        detail,
      },
      defaultFiles: files,
    });
  };
  const onClickDeleteMenu = (reviewId) => {
    openModal(ReviewDeleteModal, {
      handleClose: closeModal,
      reviewId,
      placeId,
    });
  };
  const onClickImage = ({ images, initialImageIndex }) => {
    openModal(ImageSliderModal, {
      handleClose: closeModal,
      images,
      initialImageIndex,
    });
  };
  return (!params.id && cnt !== 0) || params.id ? (
    <div>
      <ReviewHeader>
        <div className="review-info">
          <h2>리뷰</h2>
          <span>{cnt}개</span>
        </div>

        {params.id ? (
          <Button
            onClick={() => {
              openModal(ReviewModal, {
                handleClose: closeModal,
                name,
                placeId,
              });
            }}
          >
            <FaPen /> 리뷰 작성하기
          </Button>
        ) : (
          <Link to={`/cocktailbar/${placeId}`} className="more-link">
            더보기
          </Link>
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
              {review.UNO_USER.ISWRITER && params.id && (
                <DropdownMenu
                  handlers={[
                    () =>
                      onClickEditMenu(review.REVIEW_ID, {
                        rating: review.RATING,
                        detail: review.TEXT,
                        keyword: review.KEYWORDS.map((keyword) => keyword.id),
                        imageIds: review.imgIdArr,
                      }),
                    () => onClickDeleteMenu(review.REVIEW_ID),
                  ]}
                />
              )}
            </div>
            <p>&ldquo;{review.TEXT}&rdquo;</p>
            <div className="image-list">
              {review.imgIdArr.slice(0, 3).map((imageId, index) => (
                <div
                  key={imageId}
                  onClick={() =>
                    onClickImage({
                      images: review.imgIdArr.map((imageId) =>
                        getReviewImageUrl(imageId)
                      ),
                      initialImageIndex: index,
                    })
                  }
                >
                  <img src={getReviewImageUrl(imageId)} />
                  {index === 2 && review.imgIdArr.length - index - 1 > 0 && (
                    <div className="box">
                      + {review.imgIdArr.length - index - 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
  gap: 1.25rem;
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
  .more-link {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.lightGray};
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
    .image-list {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 0.5rem;
      & > div {
        position: relative;
        width: calc(16.25rem / 3);
        height: calc(16.25rem / 3);
        border-radius: 10px;
        cursor: pointer;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
        }
        & > .box {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          border-radius: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          color: ${({ theme }) => theme.color.primaryGold};
        }
      }
    }
  }
`;

export default ReviewList;
