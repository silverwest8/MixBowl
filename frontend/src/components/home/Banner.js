import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const LINKS = ["/recipe", "/community", "/cocktailbar"];
export const Banner = () => {
  return (
    <BannerBox>
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        effect={"fade"}
      >
        {LINKS.map((link, index) => {
          return (
            <SwiperSlide key={link}>
              <ImageWrapper>
                <Link to={link}>
                  <img src={`/images/banner${index + 1}.svg`} />
                </Link>
              </ImageWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerBox>
  );
};

const BannerBox = styled.div`
  padding: 0 1rem;
  height: 17vw;
  margin: 2rem auto 0;
  max-width: 1144px;

  @media screen and (min-width: 1144px) {
    height: 12.5rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & > img {
    position: absolute;
    inset: 0;
  }
`;

export default Banner;
