import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

function ServiceSlider({ images }) {
  return (
    <div className="swiper mySwiper">
      <Swiper
        className="mySwiper"
        slidesPerView={1}
        effect="fade"
        loop={true}
        modules={[Navigation, EffectFade, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {images?.map((image) => (
          <SwiperSlide key={image.image} className="service-slide">
            <img src={image.image} alt="service" />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}

export default ServiceSlider;
