import styled from "styled-components";
import { FaComments } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const HomeAnswer = ({ num }) => {
  const isMobile = window.innerWidth < 428;

  return (
    <>
      <Section>
        <HomeTitleBox num={num}>
          <FaComments className="logo"></FaComments>
          <p>지금 당신의 답변을 기다리고 있어요</p>
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
        className="answerSlider"
        navigation={!isMobile}
        pagination={isMobile}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          return (
            <SwiperSlide key={item}>
              <ItemBox>
                <h4>
                  질문이 들어갑니다 질문이 들어갑니다 질문이 들어갑니다 질문이
                  들어갑니다 질문이 들어갑니다 질문이 들어갑니다 질문이
                  들어갑니다 질문이 들어갑니...
                </h4>
                <div className="nickname">
                  닉네임 <MemberBadge></MemberBadge>
                </div>
                <p className="time">14시간 전</p>
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
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  width: 18.75rem;
  height: 11.25rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 0.75rem;
  h4 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1.25rem;
  }
  .nickname {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
  }
  .time {
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

export default HomeAnswer;
