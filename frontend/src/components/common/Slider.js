import React from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const defaultPrevElId = "swiper-prev";
const defaultNextElId = "swiper-next";

export const CustomSwiper = ({
  loop,
  initialSlide,
  slidesPerView,
  spaceBetween,
  prevElId,
  nextElId,
  children,
}) => {
  return (
    <Swiper
      loop={loop}
      navigation={{
        prevEl: `#${prevElId || defaultPrevElId}`,
        nextEl: `#${nextElId || defaultNextElId}`,
      }}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      initialSlide={initialSlide || 0}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children}
    </Swiper>
  );
};

export const SlideNextButton = ({ nextElId, children }) => {
  const swiper = useSwiper();
  const onClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };
  return (
    <Button
      onClick={onClick}
      type="button"
      id={nextElId || defaultNextElId}
      className="next-button"
    >
      {children}
    </Button>
  );
};

export const SlidePrevButton = ({ prevElId, children }) => {
  const swiper = useSwiper();
  const onClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };
  return (
    <Button
      onClick={onClick}
      type="button"
      id={prevElId || defaultPrevElId}
      className="prev-button"
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  color: ${({ theme }) => theme.color.primaryGold};
  font-size: 1.25rem;
  @media screen and (${({ theme }) => theme.device.mobile}) {
    display: none;
  }
`;

const Slider = ({
  elementList,
  spaceBetween,
  swiperSlideStyle,
  prevElId,
  nextElId,
}) => {
  return (
    <SliderWrapper>
      <SlidePrevButton prevElId={prevElId}>
        <FaChevronLeft />
      </SlidePrevButton>
      {/* <BlurBox className="prev-blur-box" /> */}
      <CustomSwiper
        slidesPerView="auto"
        spaceBetween={spaceBetween || 20}
        prevElId={prevElId}
        nextElId={nextElId}
      >
        {elementList.map((element, index) => (
          <SwiperSlide style={swiperSlideStyle} key={index}>
            {element}
          </SwiperSlide>
        ))}
      </CustomSwiper>
      <SlideNextButton nextElId={nextElId}>
        <FaChevronRight />
      </SlideNextButton>
      <BlurBox className="next-blur-box" />
    </SliderWrapper>
  );
};

const BlurBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  width: 158px;
  height: 100%;
  background: linear-gradient(270deg, #111111 0%, rgba(17, 17, 17, 0) 100%);
  &.prev-blur-box {
    left: 0;
    background: linear-gradient(90deg, #111111 0%, rgba(17, 17, 17, 0) 100%);
  }
  @media screen and (${({ theme }) => theme.device.mobile}) {
    display: none;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    &:disabled {
      display: none;
    }
  }
  .prev-button:disabled ~ .prev-blur-box {
    display: none;
  }
  .next-button:disabled ~ .next-blur-box {
    display: none;
  }
  .prev-button {
    left: 0px;
  }
  .next-button {
    right: 0px;
  }
  .swiper-slide {
    position: relative;
  }
  .swiper-wrapper {
    margin-bottom: 0;
  }
  .swiper-pagination {
    display: none;
  }
  @media screen and (${({ theme }) => theme.device.mobile}) {
    & > button {
      display: none;
    }
  }
`;

export default Slider;
