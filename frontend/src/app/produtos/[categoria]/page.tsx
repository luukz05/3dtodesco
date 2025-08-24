"use client";

import ItemCard from "@/components/ItemCard";
import Line from "@/components/line";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type ImagemProduto = {
  url: string;
  origem: string;
};

type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  imagens: ImagemProduto[];
  subcategoria?: string;
};

type CategoriaProps = {
  params: {
    categoria: string;
  };
};

export default function ProdutosPorCategoria({ params }: CategoriaProps) {
  const { categoria } = params;
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [subcategorias, setSubcategorias] = useState<string[]>([]);
  const [filtroSubcategoria, setFiltroSubcategoria] = useState<string>("");

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/produtos/categoria/${categoria}`
        );
        const data: Produto[] = res.ok ? await res.json() : [];
        setProdutos(data);

        // Extrai as subcategorias únicas
        const subcats: string[] = Array.from(
          new Set(
            data.map((p) => p.subcategoria).filter((s): s is string => !!s)
          )
        );
        setSubcategorias(subcats);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProdutos();
  }, [categoria]);

  const produtosFiltrados = filtroSubcategoria
    ? produtos.filter((p) => p.subcategoria === filtroSubcategoria)
    : produtos;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex gap-6">
      {/* Sidebar lateral usando ShadCN */}
      <Card className="w-64 sticky top-4 h-[calc(100vh-1rem)] bg-white flex flex-col">
        <CardHeader>
          <CardTitle className="mt-5 text-center">
            Filtrar por Subcategoria
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-2">
            <div className="flex flex-col gap-2">
              <Button
                variant={filtroSubcategoria === "" ? "default" : "ghost"}
                onClick={() => setFiltroSubcategoria("")}
                className="w-full text-left hover:cursor-pointer"
              >
                Todas
              </Button>
              {subcategorias.map((subcat) => (
                <Button
                  key={subcat}
                  variant={filtroSubcategoria === subcat ? "default" : "ghost"}
                  onClick={() => setFiltroSubcategoria(subcat)}
                  className="w-full text-left hover:cursor-pointer"
                >
                  {subcat}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conteúdo principal */}
      <section className="flex-1">
        <Line />
        <h1 className="text-4xl font-medium text-center mb-10 mt-10">
          {categoria === "filmes-e-series"
            ? "Filmes e Séries"
            : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </h1>

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
      </section>
    </main>
  );
}
