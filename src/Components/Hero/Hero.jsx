import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import Crousal_1 from "./Crousal_Item/Crousal_1";
import Crousal_2 from "./Crousal_Item/Crousal_2";
import Crousal_3 from "./Crousal_Item/Crousal_3";
import ScrollAnimation from "../Scroll/ScrollAnimation";

const Hero = () => {
  return (
    <div>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper carousel w-full"
      >
        <SwiperSlide className="carousel-item relative w-full">
          <ScrollAnimation delay={0.2} aos="fade-left">
            <Crousal_1 />
          </ScrollAnimation>
        </SwiperSlide>

        <SwiperSlide className="carousel-item relative w-full">
          <ScrollAnimation delay={0.4} aos="fade-left">
            <Crousal_2 />
          </ScrollAnimation>
        </SwiperSlide>

        <SwiperSlide className="carousel-item relative w-full">
          <ScrollAnimation delay={0.6} aos="fade-left">
            <Crousal_3 />
          </ScrollAnimation>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
