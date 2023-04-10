import React from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, useSwiper } from "swiper/react";

const defaultPrevElId = "swiper_prev";
const defaultNextElId = "swiper_next";

const CustomSwiper = ({
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
      initialSlide={initialSlide}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children}
    </Swiper>
  );
};

export default CustomSwiper;

export const SlideNextButton = ({ nextElId }) => {
  const swiper = useSwiper();
  const onClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };
  return (
    <Button onClick={onClick} type="button" id={nextElId || defaultNextElId}>
      <FaChevronCircleRight />
    </Button>
  );
};

export const SlidePrevButton = ({ prevElId }) => {
  const swiper = useSwiper();
  const onClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };
  return (
    <Button onClick={onClick} type="button" id={prevElId || defaultPrevElId}>
      <FaChevronCircleLeft />
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
