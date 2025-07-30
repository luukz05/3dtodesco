"use client";

import ItemCard from "@/components/ItemCard";
import NavbarDropdown from "@/components/Navbar";
import BackgroundCarousel from "@/components/BackgroundCarousel";

const produtos = [
  {
    id: 1,
    nome: "Suporte de Celular 3D",
    preco: "R$ 25,00",
    imagem: "/produtos/suporte-celular.jpg",
    descricao: "Suporte prático e resistente para celulares, feito sob medida.",
  },
  {
    id: 2,
    nome: "Organizador de Cabos",
    preco: "R$ 15,00",
    imagem: "/produtos/organizador-cabos.jpg",
    descricao: "Mantenha sua mesa organizada com estilo.",
  },
  {
    id: 3,
    nome: "Mini Vaso Decorativo",
    preco: "R$ 30,00",
    imagem: "/produtos/vaso.jpg",
    descricao: "Ideal para decorar ambientes com personalidade.",
  },
  {
    id: 4,
    nome: "Mini Vasos Decorativos",
    preco: "R$ 300,00",
    imagem: "/produtos/vaso.jpg",
    descricao: "Ideal para decorar ambientes com personalidade.",
  },
  {
    id: 5,
    nome: "Suporte de Celular 3D",
    preco: "R$ 25,00",
    imagem: "/produtos/suporte-celular.jpg",
    descricao: "Suporte prático e resistente para celulares, feito sob medida.",
  },
  {
    id: 6,
    nome: "Organizador de Cabos",
    preco: "R$ 15,00",
    imagem: "/produtos/organizador-cabos.jpg",
    descricao: "Mantenha sua mesa organizada com estilo.",
  },
  {
    id: 7,
    nome: "Mini Vaso Decorativo",
    preco: "R$ 30,00",
    imagem: "/produtos/vaso.jpg",
    descricao: "Ideal para decorar ambientes com personalidade.",
  },
  {
    id: 8,
    nome: "Mini Vasos Decorativos",
    preco: "R$ 300,00",
    imagem: "/produtos/vaso.jpg",
    descricao: "Ideal para decorar ambientes com personalidade.",
  },
  // ... continue com seus produtos
];

export default function Home() {
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
              produto={produto}
              imagem={"/pcd.png"}
              preco={produto.preco}
              nome={produto.nome}
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
