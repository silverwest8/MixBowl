import { SwiperSlide } from "swiper/react";
import CustomSwiper, { SlidePrevButton, SlideNextButton } from "./Slider";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import Dialog from "@mui/material/Dialog";

const prevElId = "image_slider_modal_back";
const nextElId = "image_slider_modal_forward";

const ImageSliderModal = ({ images, alt, initialImageIndex, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={true}>
      <SliderDiv>
        {images.length !== 1 && <SlidePrevButton prevElId={prevElId} />}
        <CustomSwiper
          loop
          initialSlide={initialImageIndex || 0}
          prevElId={prevElId}
          nextElId={nextElId}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={alt} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
        {images.length !== 1 && <SlideNextButton nextElId={nextElId} />}
      </SliderDiv>
    </Dialog>
  );
};

const SliderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .swiper-wrapper {
    position: relative;
    max-width: 500px;
    max-height: 500px;
    width: 80vmin;
    height: 80vmin;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    object-fit: cover;
  }
`;

// ImageSlider 사용 예시
export const ImageSliderModalShowButton = () => {
  const { openModal, closeModal } = useModal();
  return (
    <button
      onClick={() =>
        openModal(ImageSliderModal, {
          handleClose: closeModal,
          images: [
            "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          ],
        })
      }
    >
      이미지 슬라이드 모달 오픈
    </button>
  );
};

export default ImageSliderModal;
