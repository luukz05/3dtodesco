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
import Line from "@/components/line";

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
      <section className="scale-75">
        <Line />
      </section>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 justify-center items-center h-full mt-5 ">
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
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {produto.nome}
            </h1>
            <p className="text-2xl font-semibold text-black mb-4">
              R$ {produto.preco},00{" "}
              <span className="text-sm font-thin text-gray-500">via Pix</span>
            </p>
            <QuantidadeSelector quantidade={1} setQuantidade={() => {}} />
          </div>

          {/* Seletor de quantidade */}

          <div className="">
            <p className="text-gray-700 mb-4 text-lg leading-relaxed break-words text-justify max-w-lg ">
              {produto.descricao}
            </p>
            <div className="border border-gray-300 rounded-md overflow-hidden max-w-lg">
              {/* Cabeçalho */}
              <div className="bg-gray-100 px-4 py-2 text-gray-800 font-semibold">
                Especificações Técnicas
              </div>

              {/* Conteúdo */}
              <div className="divide-y divide-gray-200">
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Largura</span>
                  <span>X,XX cm</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">
                    Profundidade
                  </span>
                  <span>X,XX cm</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Altura</span>
                  <span>X,XX cm</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Peso</span>
                  <span>XXX gramas</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Material</span>
                  <span>PLA (Filamento Sólido e GTMax)</span>
                </div>
              </div>
            </div>
          </div>

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
