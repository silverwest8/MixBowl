import styled from "styled-components";
import { FaComments } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import { getQuestion } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeAnswer = () => {
  const isMobile = window.innerWidth < 428;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const questionData = await getQuestion();
      setData(questionData);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Section>
        <HomeTitleBox>
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
        {data &&
          data.list.slice(0, 10).map((item) => {
            return (
              <SwiperSlide key={item.postId}>
                <ItemBox>
                  <Link to={`/community/${item.postId}`}>
                    <h4>{item.content}</h4>
                  </Link>
                  <div>
                    <div className="nickname">
                      @{item.USER.nickname}
                      <MemberBadge level={item.USER.level}></MemberBadge>
                    </div>
                    <p className="time">{item.date.slice(0, 10)}</p>
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
    color: ${({ theme }) => theme.color.lightGray};
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  h4 {
    font-size: 1.125rem;
    font-weight: bold;
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
