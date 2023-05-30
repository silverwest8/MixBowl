import styled from "styled-components";
import { FaComments } from "react-icons/fa";
import MemberBadge from "../common/MemberBadge";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getQuestion } from "../../api/homeapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../common/Slider";
import Skeleton from "@mui/material/Skeleton";
import { theme } from "../../styles/theme";

const HomeAnswer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const questionData = await getQuestion();
      setData(questionData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Section>
        <HomeTitleBox>
          <FaComments className="logo"></FaComments>
          <p>지금 당신의 답변을 기다리고 있어요</p>
        </HomeTitleBox>
      </Section>
      <div className="answerSlider">
        <Slider
          elementList={
            data
              ? data.list.slice(0, 10).map((item) => {
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
                })
              : Array(3)
                  .fill(1)
                  .map((_, index) => (
                    <SwiperSlide key={index}>
                      <Skeleton
                        variant="rounded"
                        width="100%"
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
    font-size: 1.5rem;
  }
`;

const ItemBox = styled.div`
  width: 100%;
  height: 11.25rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 12px;
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
