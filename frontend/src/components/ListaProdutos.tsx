"use client";

import ItemCard from "@/components/ItemCard";
import { useFiltro } from "@/context/FiltroContext";

type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  imagens: { url: string; origem: string }[];
  subcategoria?: string;
};

export default function ListaProdutos({ produtos }: { produtos: Produto[] }) {
  const { filtroSubcategoria } = useFiltro();

  const produtosFiltrados = filtroSubcategoria
    ? produtos.filter((p) => p.subcategoria === filtroSubcategoria)
    : produtos;

  return (
    <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
      {produtosFiltrados.length > 0 ? (
        produtosFiltrados.map((produto) => (
          <ItemCard
            key={produto._id}
            id={produto._id}
            imagem={produto?.imagens?.[0]?.url}
            preco={produto.preco}
            nome={produto.nome}
          />
        ))
      ) : (
        <p className="text-center col-span-4 font-bold text-black/20">
          Nenhum produto encontrado nesta subcategoria.
        </p>
      )}
    </div>
  );
}
