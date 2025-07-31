"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import NavbarDropdown from "@/components/Navbar";
import BackgroundCarousel from "@/components/BackgroundCarousel";

type Produto = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProdutos(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <NavbarDropdown />

      {/* Hero com carrossel */}
      <section className="relative h-[90vh] w-full">
        <BackgroundCarousel />
      </section>

      {/* Produtos */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {produtos.map((produto) => (
            <ItemCard
              key={produto.id}
              id={produto.id}
              imagem={"/pcd.png"} // você pode alterar para produto.thumbnail se quiser usar imagem da API
              preco={produto.price}
              nome={produto.title}
            />
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center mt-12">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Impressão 3D Criativa. Todos os
          direitos reservados.
        </p>
      </footer>
    </main>
  );
}
