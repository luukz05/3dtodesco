"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "/slide-1.jpg",
    title: "Bem-vindo ao nosso site",
    description:
      "Aqui você encontra as melhores soluções em tecnologia e inovação para o seu negócio.",
  },
  {
    image: "/slide-2.jpg",
    title: "Descubra nossos projetos",
    description:
      "Conheça cases de sucesso que desenvolvemos com nossos clientes e parceiros.",
  },
];

export default function BackgroundCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        allowTouchMove={true}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center "
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="text-white text-center px-4 ml-55">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-xl mx-auto drop-shadow-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Custom pagination bullets */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: white;
          opacity: 0.5;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: #fff;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
