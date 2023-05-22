import styled from "styled-components";
import { FaTrophy, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const HomeRecipe = ({ num }) => {
  const isMobile = window.innerWidth < 428;

  return (
    <>
      <Section>
        <HomeTitleBox num={num}>
          <FaTrophy className="logo"></FaTrophy>
          <p className="bold">이번주 인기 칵테일 레시피</p>
        </HomeTitleBox>
      </Section>
      <Swiper
        style={{
          "--swiper-navigation-size": "1.5rem",
          "--swiper-navigation-color": "#e9aa33",
        }}
        slidesPerView={"auto"}
        centeredSlides={false}
        modules={[Navigation, Pagination]}
        className="recipeSlider"
        navigation={!isMobile}
        pagination={isMobile}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          return (
            <SwiperSlide key={item}>
              <ItemBox>
                <p className="nickname">닉네임님의 레시피</p>
                <div className="content">
                  <img src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"></img>
                  <p>
                    이번주에 작성한 최근 좋아요한 리뷰 텍스트가 들어갑니다.
                    이번주에 작성한 최근 좋아요한 리뷰 텍스트가 들어갑니다.
                    이번주에 작성한 최근 좋아요한 리뷰 텍스트가 들어갑니다.
                    이번주에 작성한 최근 좋아요한 리뷰 텍스트가 들어갑니다.
                  </p>
                </div>
                <div className="info">
                  <p>Old Fashioned</p>
                  <div>
                    <div className="thumbs">
                      <FaThumbsUp /> 10
                    </div>
                    <div className="comment">
                      <FaCommentDots /> 10
                    </div>
                  </div>
                </div>
              </ItemBox>
            </SwiperSlide>
          );
        })}
        <Gradient></Gradient>
      </Swiper>
    </>
  );
};

const Section = styled.div`
  padding: 0 1rem;
  margin: 2rem auto 0;
  max-width: 1144px;
`;
const Gradient = styled.div`
  width: 10%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-image: linear-gradient(
    to left,
    #111111 0%,
    rgba(17, 17, 17, 0) 100%
  );
  z-index: 1;
`;

const HomeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  .logo {
    color: ${({ theme, num }) =>
      num === 1
        ? theme.color.lightGray
        : num === 2
        ? theme.color.primaryGold
        : num === 3
        ? theme.color.red
        : null};
    margin-right: 0.75rem;
  }
  p {
    text-size: 1.5rem;
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.75rem;
  padding: 0.875rem 1.5rem;
  @media screen and (max-width: 428px) {
    width: 22.8rem;
    height: 11.8rem;
    padding: 0.4rem 0.7rem;
  }
  img {
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 0.75rem;
    margin-right: 1rem;
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
    justify-content: space-between;
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
  }
`;

export default HomeRecipe;
