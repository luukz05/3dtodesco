"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules"; // <- Navigation importado
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation"; // <- CSS da navegação
import { useState } from "react";

const slides = [
  {
    image: "/slide-1.jpg",
    title: "Bem-vindo à 3D Todesco",
    description:
      "Aqui nós transformamos suas ideias em realidade com impressões 3D de alta qualidade.",
  },
  {
    image: "/slide-2.jpg",
    title: "Confira nossos produtos",
    description:
      "Conheça nossa variedade de produtos personalizados e técnicos.",
  },
];

export default function BackgroundCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]} // <- Adicionado Navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        allowTouchMove={false}
        pagination={{ clickable: true }}
        // navigation
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="text-white text-center px-4 ml-40">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop- select-none">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-xl mx-auto drop- select-none">
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

        /* Estilo das setas */
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          width: 44px;
          height: 44px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          padding: 10px;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: rgba(255, 255, 255, 0.3);
          color: black;
        }
      `}</style>
    </div>
  );
}
