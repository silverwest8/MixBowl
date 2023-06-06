import styled from "styled-components";
import { FaTrophy, FaThumbsUp, FaCommentDots, FaPen } from "react-icons/fa";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCocktail } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../common/Slider";
import Skeleton from "@mui/material/Skeleton";
import { theme } from "../../styles/theme";
import { getLinkWithAuth } from "../../utils/link";
import { getAccessToken } from "../../utils/token";
import { useModal } from "../../hooks/useModal";
import LoginFormModal from "../login/LoginFormModal";

const HomeCocktail = () => {
  const token = getAccessToken();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [data, setData] = useState(null);
  const onClick = (event, id) => {
    event.stopPropagation();
    if (token) {
      navigate("/community/posting", { state: { cocktail: String(id) } });
    } else {
      openModal(LoginFormModal, {
        handleClose: closeModal,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cocktailData = await getCocktail();
      setData(cocktailData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Section>
        <HomeTitleBox>
          <FaTrophy className="logo"></FaTrophy>
          <p className="bold">이번주 인기 칵테일 레시피</p>
        </HomeTitleBox>
      </Section>
      <div className="recipeSlider">
        <Slider
          prevElId="recipe-slider-prev"
          nextElId="recipe-slider-next"
          elementList={
            data
              ? data.list.slice(0, 10).map((item) => (
                  <SwiperSlide key={item.cocktailId}>
                    <ItemBox
                      onClick={() =>
                        navigate(getLinkWithAuth(`/recipe/${item.cocktailId}`))
                      }
                    >
                      <div className="content">
                        <img src={"/api/recipes/image/" + item.cocktailId} />
                        {item.reviewContent ? (
                          <div className="review">
                            {item.USER.nickname !== "ninja" &&
                              item.USER.nickname !== "cocktaildb" && (
                                <span className="nickname">
                                  {item.USER.nickname}님의 레시피
                                </span>
                              )}
                            <p>{item.reviewContent}</p>
                          </div>
                        ) : (
                          <NoReview>
                            아직 리뷰가 없어요.
                            <br />첫 리뷰를 작성해주세요~
                            <WriteButton
                              onClick={(e) => onClick(e, item.cocktailId)}
                              type="button"
                            >
                              <FaPen className="pen"></FaPen>작성하기
                            </WriteButton>
                          </NoReview>
                        )}
                      </div>
                      <div className="info">
                        <h2 className="name">{item.cocktailName}</h2>
                        <div>
                          <div className="thumbs">
                            <FaThumbsUp />
                            {item.like}
                          </div>
                          <div className="comment">
                            <FaCommentDots />
                            {item.reply}
                          </div>
                        </div>
                      </div>
                    </ItemBox>
                  </SwiperSlide>
                ))
              : Array(3)
                  .fill(1)
                  .map((_, index) => (
                    <SwiperSlide key={index}>
                      <Skeleton
                        variant="rounded"
                        width="24rem"
                        height="15rem"
                        sx={{
                          backgroundColor: theme.color.darkGray,
                        }}
                      />
                    </SwiperSlide>
                  ))
          }
        />
      </div>
    </>
  );
};

const Section = styled.div`
  padding: 0 1rem;
  margin: 2rem auto 0;
  max-width: 1144px;
`;

const NoReview = styled.div`
  color: ${({ theme }) => theme.color.lightGray};
  width: 58%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.5rem;
`;

const WriteButton = styled.button`
  display: flex;
  background-color: #e9aa33;
  border-radius: 0.75rem;
  width: 5.5rem;
  height: 1.5rem;
  color: #383835;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .pen {
    margin-right: 0.1rem;
  }
`;

const HomeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  .logo {
    color: ${({ theme }) => theme.color.primaryGold};
    margin-right: 0.75rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  .nickname {
    display: block;
    width: 100%;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.lightGray};
    text-align: right;
  }
  .review {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    line-height: 1.5rem;
    overflow-y: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 428px) {
      -webkit-line-clamp: 5;
    }
  }
  .content {
    display: flex;
    margin-bottom: 0.25rem;
    gap: 1.5rem;
    height: 12rem;
    img {
      width: 12rem;
      height: 100%;
      border-radius: 0.75rem;
      object-fit: cover;
      @media screen and (max-width: 428px) {
        width: 7.5rem;
      }
    }
    p {
      width: 16rem;
      height: 100%;
      @media screen and (max-width: 428px) {
        width: 12rem;
      }
    }
    @media screen and (max-width: 428px) {
      height: 7.5rem;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    .name {
      font-size: 1.5rem;
    }
    div {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      .thumbs {
        color: ${({ theme }) => theme.color.primaryGold};
        margin-right: 0.5rem;
      }
      .comment {
        color: ${({ theme }) => theme.color.lightGray};
      }
    }
    @media screen and (max-width: 428px) {
      .name {
        font-size: 1.125rem;
      }
    }
  }
`;

export default HomeCocktail;
