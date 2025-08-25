"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { MainNavigation } from "@/components/Navbar";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import Line from "@/components/line";
import { Sidebar } from "@/components/altmenu";

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

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

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
          {produtosDestaque.length > 0 ? (
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
          {produtos.map((produto) => (
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
