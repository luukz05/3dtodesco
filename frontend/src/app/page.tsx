"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import Line from "@/components/line";

type ImagemProduto = {
  url: string;
  origem: string;
};

type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  altura?: number;
  largura?: number;
  profundidade?: number;
  peso?: number;
  material?: string;
  origem?: string;
  imagens: ImagemProduto[];
  destaque: boolean;
};

function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col rounded-2xl bg-white shadow-md overflow-hidden">
      <div className="h-40 bg-gray-200 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch(
          "https://threedtodesco.onrender.com/api/produtos"
        );
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  const produtosDestaque = produtos.filter((p) => p.destaque);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero / Carousel */}
      <section className="relative h-[40vh] sm:h-[50vh] w-full">
        <BackgroundCarousel />
      </section>

      <Line />

      {/* Produtos em Destaque */}
      <section className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6 sm:mb-10 mt-8 sm:mt-12">
          Produtos em Destaque
        </h1>
        <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : produtosDestaque.length > 0 ? (
            produtosDestaque.map((produto) => (
              <ItemCard
                key={produto._id}
                id={produto._id}
                imagem={produto?.imagens?.[0]?.url}
                preco={produto.preco}
                nome={produto.nome}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Nenhum produto em destaque no momento.
            </p>
          )}
        </div>
      </section>

      {/* Todos os produtos */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6 sm:mb-10 mt-8 sm:mt-12">
          Todos os produtos
        </h1>
        <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : produtos.map((produto) => (
                <ItemCard
                  key={produto._id}
                  id={produto._id}
                  imagem={produto?.imagens?.[0]?.url}
                  preco={produto.preco}
                  nome={produto.nome}
                />
              ))}
        </div>
      </section>
    </main>
  );
}
