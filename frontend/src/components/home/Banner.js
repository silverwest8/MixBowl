import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css/effect-fade";

const BannerBox = styled.div`
  margin-top: 40px;
  img {
    width: 80%;
  }
`;

export const Banner = () => {
  const num = [1, 2, 3];
  return (
    <BannerBox>
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        effect={"fade"}
      >
        {[1, 2, 3].map((index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={process.env.PUBLIC_URL + "/images/banner" + index + ".svg"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerBox>
  );
};

export default Banner;
