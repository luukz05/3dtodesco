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
    return (
      <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900 animate-pulse">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center md:items-start h-full mt-5 px-4">
          {/* Carrossel skeleton */}
          <div className="w-full md:w-[600px] flex flex-col">
            <div className="w-full aspect-square bg-gray-200 rounded-md" />
            <div className="h-3 w-1/2 bg-gray-200 rounded mt-4 mx-auto" />
          </div>
          {/* Informações do produto skeleton */}
          <div className="flex flex-col gap-5 flex-1 w-full">
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto md:mx-0 mb-4" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="h-5 bg-gray-200 rounded w-32 mx-auto md:mx-0" />
                <div className="flex gap-2 justify-center md:justify-end">
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-24 mx-auto md:mx-0" />
            </div>
            {/* Descrição skeleton */}
            <div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="border border-gray-300 rounded-md overflow-hidden mt-4">
                <div className="bg-gray-200 h-8 w-1/3" />
                <div className="divide-y divide-gray-200">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between px-4 py-3">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Botões skeleton */}
            <div className="flex mb-5 flex-col md:flex-row justify-center gap-4">
              <div className="h-10 bg-gray-200 rounded w-full md:w-1/2" />
              <div className="h-10 bg-gray-200 rounded w-full md:w-1/2" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <section className="hidden md:block md:scale-75">
        <Line />
      </section>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center md:items-start h-full mt-5 px-4">
        {/* Carrossel */}
        <div className="w-full md:w-[600px] flex flex-col ">
          <Carousel>
            {/* Mobile - sem Previous e Next */}
            <div className="md:hidden">
              <CarouselPrevious className="hover:cursor-pointer hidden" />
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
              <CarouselNext className="hover:cursor-pointer hidden" />
            </div>

            {/* Desktop - com Previous e Next */}
            <div className="hidden md:block">
              <CarouselPrevious className="hover:cursor-pointer" />
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
              <CarouselNext className="hover:cursor-pointer" />
            </div>
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
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.preco)}{" "}
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
                    {" "}
                    Profundidade{" "}
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
