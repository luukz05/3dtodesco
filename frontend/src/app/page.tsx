"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { MainNavigation } from "@/components/Navbar";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import Line from "@/components/line";
import { Sidebar } from "@/components/altmenu";

type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  url_imagem: string;
};

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/produtos");
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="relative h-[50vh] w-full">
        <BackgroundCarousel />
      </section>
      <Line />
      <section>
        <h1 className="text-4xl font-medium text-center mb-10 mt-10">
          Destaques
        </h1>
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {produtos.map((produto) => (
            <ItemCard
              key={produto._id}
              id={produto._id}
              imagem={produto.url_imagem[0]}
              preco={produto.preco}
              nome={produto.nome}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
