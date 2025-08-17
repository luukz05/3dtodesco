"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Footer from "@/components/Footer";
import { TbShoppingCartBolt, TbShoppingCartPlus } from "react-icons/tb";
import BotaoComprarAgora from "@/components/ComprarAgora";
import BotaoAdicionarCarrinho from "@/components/AdicionarCarrinho";
import QuantidadeSelector from "@/components/QuantidadeSelector";
import React from "react";

export default function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Resolve o params com React.use()
  const { id } = use(params);

  // Aqui já pode usar o id normalmente
  const [produto, setProduto] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/produtos/${id}`)
      .then((res) => res.json())
      .then(setProduto);
  }, [id]);

  if (!produto) {
    return <p className="text-center mt-20">Carregando produto...</p>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 justify-center items-center h-full mt-25 ">
        {/* Carrossel */}
        <div className="flex justify-center flex-col md:justify-start w-full md:w-[600px] h-[600px]">
          <Carousel>
            <CarouselPrevious className="hover:cursor-pointer" />
            <CarouselContent>
              {(produto.url_imagem || []).map((imagem: string, i: number) => (
                <CarouselItem key={i} className="w-[100px] h-full">
                  <AspectRatio
                    ratio={1 / 1}
                    className="bg-muted overflow-hidden w-full h-full"
                  >
                    <Image
                      src={imagem}
                      alt={`Imagem do produto ${i + 1}`}
                      fill
                      className="object-cover select-none"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="hover:cursor-pointer" />
          </Carousel>
          <p className="text-xs text-center my-2">
            Imagens via{" "}
            <span className="text-green-400 font-semibold">Maker World</span>
          </p>
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col justify-around gap-15 flex-1">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {produto.nome}
            </h1>
            <p className="text-2xl font-semibold text-black mb-4">
              R$ {produto.preco},00
            </p>
          </div>

          {/* Seletor de quantidade */}
          <QuantidadeSelector quantidade={1} setQuantidade={() => {}} />

          <p className="text-gray-700 mb-6 text-lg leading-relaxed break-words text-justify max-w-lg">
            {produto.descricao}
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <BotaoAdicionarCarrinho produto={produto} />
            <BotaoComprarAgora
              produtoNome={produto.nome}
              numeroWhatsApp="5515991950200"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
