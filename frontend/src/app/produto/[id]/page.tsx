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
import { Badge } from "@/components/ui/badge";
import BotaoComprarAgora from "@/components/ComprarAgora";
import BotaoAdicionarCarrinho from "@/components/AdicionarCarrinho";
import QuantidadeSelector from "@/components/QuantidadeSelector";
import React from "react";
import Line from "@/components/line";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [quantidade, setQuantidade] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [produto, setProduto] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`https://threedtodesco.onrender.com/api/produtos/${id}`)
      .then((res) => res.json())
      .then(setProduto);
  }, [id]);

  if (!produto) {
    return <p className="text-center mt-20">Carregando produto...</p>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <section className="hidden md:block md:scale-75">
        <Line />
      </section>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center md:items-start h-full mt-5 px-4">
        {/* Carrossel */}
        <div className="w-full md:w-[600px] flex flex-col">
          <Carousel>
            <CarouselPrevious className="hidden md:block hover:cursor-pointer" />

            <CarouselContent>
              {(produto.imagens || []).map(
                (
                  imagem: { url: string | StaticImport },
                  i: React.Key | null | undefined
                ) => (
                  <CarouselItem key={i} className="w-full">
                    <AspectRatio
                      ratio={1 / 1}
                      className="bg-muted overflow-hidden w-full h-full rounded-md"
                    >
                      <Image
                        src={imagem.url}
                        alt={`Imagem do produto ${produto.nome}`}
                        fill
                        className="object-cover select-none"
                        priority={i === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </AspectRatio>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselNext className="hidden md:block hover:cursor-pointer" />
          </Carousel>
          <p className="text-xs text-center my-2">
            Imagens: <span className="font-semibold">{produto.origem}</span>
          </p>
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col gap-5 flex-1 w-full">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-center md:text-left">
              {produto.nome}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <p className="text-xl md:text-2xl font-semibold text-black text-center md:text-left">
                R$ {produto.preco},00{" "}
                <span className="text-sm font-thin text-gray-500">via Pix</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <Badge>
                  {produto.categoria === "filmes-e-series"
                    ? "Filmes e Séries"
                    : produto.categoria.charAt(0).toUpperCase() +
                      produto.categoria.slice(1)}
                </Badge>
                <Badge>{produto.subcategoria}</Badge>
              </div>
            </div>

            <QuantidadeSelector
              quantidade={quantidade}
              setQuantidade={setQuantidade}
            />
          </div>

          {/* Descrição e especificações */}
          <div>
            <p className="text-gray-700 mb-4 text-base leading-relaxed break-words text-justify">
              {produto.descricao}
            </p>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 text-gray-800 font-semibold">
                Especificações Técnicas
              </div>
              <div className="divide-y divide-gray-200 text-sm md:text-base">
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Largura</span>
                  <span>
                    {produto.largura?.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "—"}{" "}
                    cm
                  </span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Altura</span>
                  <span>
                    {produto.altura?.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "—"}{" "}
                    cm
                  </span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">
                    Profundidade
                  </span>
                  <span>
                    {produto.profundidade?.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "—"}{" "}
                    cm
                  </span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Peso</span>
                  <span>
                    {produto.peso?.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "—"}{" "}
                    g
                  </span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="font-medium text-gray-600">Material</span>
                  <span>{produto.material || "—"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex mb-5 flex-col md:flex-row justify-center gap-4">
            <BotaoAdicionarCarrinho produto={{ ...produto, quantidade }} />
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
