import styled from "styled-components";
import { FaTrophy, FaThumbsUp, FaCommentDots, FaPen } from "react-icons/fa";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCocktail } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../common/Slider";

const HomeCocktail = () => {
  const [data, setData] = useState(null);

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
              ? data.list.slice(0, 10).map((item) => {
                  return (
                    <SwiperSlide key={item.cocktailId}>
                      <ItemBox>
                        <p className="nickname">
                          {item.USER.nickname}님의 레시피
                        </p>
                        <div className="content">
                          <Link to={`/recipe/${item.cocktailId}`}>
                            <img
                              src={"/api/recipes/image/" + item.cocktailId}
                            ></img>
                          </Link>
                          {item.reviewContent ? (
                            <p>{item.reviewContent}</p>
                          ) : (
                            <NoReview>
                              아직 리뷰가 없어요.
                              <br />첫 리뷰를 작성해주세요~
                              <Link to={`/recipe/${item.cocktailId}`}>
                                <WriteButton>
                                  <FaPen className="pen"></FaPen>작성하기
                                </WriteButton>
                              </Link>
                            </NoReview>
                          )}
                        </div>
                        <div className="info">
                          <Link to={`/recipe/${item.cocktailId}`}>
                            <p>{item.cocktailName}</p>
                          </Link>
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
                  );
                })
              : []
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
  height: 17.813rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 12px;
  padding: 0.875rem 1rem;
  @media screen and (max-width: 428px) {
    height: 11.8rem;
  }
  img {
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 0.75rem;
    margin-right: 1rem;
    object-fit: cover;
    @media screen and (max-width: 428px) {
      width: 7.8rem;
      height: 7.8rem;
    }
  }
  .nickname {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.lightGray};
    text-align: right;
  }
  .content {
    display: flex;
    margin-bottom: 0.25rem;
    p {
      width: 16rem;
      height: 12rem;
      line-height: 1.5rem;
      padding-top: 0.25rem;
    }
    @media screen and (max-width: 428px) {
      p {
        width: 13rem;
        height: 7.8rem;
        line-height: 1rem;
        font-size: 0.875rem;
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
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
      p {
        font-size: 1.125rem;
      }
    }
  }
`;

export default HomeCocktail;
