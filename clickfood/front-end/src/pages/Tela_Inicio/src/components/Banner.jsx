import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../styles/Banner.css";
import entrega from "../assets/entrega.jpeg";
import pontue from "../assets/pontue.jpeg";
import cupom from "../assets/cupom.jpeg";

function Banner() {
  return (
    <div className="banner">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <img
            src={pontue}
            alt="Promoção Entrega Grátis"
            className="banner-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={entrega}
            alt="Cupons a partir de R$5"
            className="banner-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={cupom}
            alt="Volta às Aulas no iFood Shopping"
            className="banner-image"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
