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
  // ✅ Resolve o params com React.use()
  const { id } = use(params);

  // Aqui já pode usar o id normalmente
  const [quantidade, setQuantidade] = useState(1);
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 justify-center items-center h-full mt-5 ">
        {/* Carrossel */}
        <div className="flex justify-center flex-col md:w-[600px] h-full">
          <Carousel>
            <CarouselPrevious className="hover:cursor-pointer" />
            <CarouselContent>
              {(produto.imagens || []).map(
                (
                  imagem: { url: string | StaticImport },
                  i: React.Key | null | undefined
                ) => (
                  <CarouselItem key={i} className="w-[2000px] h-full">
                    <AspectRatio
                      ratio={1 / 1}
                      className="bg-muted overflow-hidden w-full h-full"
                    >
                      <Image
                        src={imagem.url} // pegando a url do objeto
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
          </Carousel>
          <p className="text-xs text-center my-2">
            Imagens via <span className=" font-semibold">{produto.origem}</span>
          </p>
        </div>

        {/* Informações do produto */}
        <div className="flex h-full w-full flex-col gap-5 flex-1">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {produto.nome}
            </h1>
            <div className="flex items-center justify-between mb-4 flex-row">
              <p className="text-2xl font-semibold text-black ">
                R$ {produto.preco},00{" "}
                <span className="text-sm font-thin text-gray-500">via Pix</span>
              </p>
              <p>
                Categoria: <Badge>{produto.categoria}</Badge>
              </p>
            </div>

            <QuantidadeSelector
              quantidade={quantidade}
              setQuantidade={setQuantidade}
            />
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
                  <span>
                    {produto.largura?.toLocaleString("pt-BR", {
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
                  <span>{produto.material}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center md:flex-row gap-4">
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
