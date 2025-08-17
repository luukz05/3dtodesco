"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextProps {
  carrinho: Produto[];
  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: string) => void;
  finalizarCompra: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const numeroWhatsApp = "5515991950200"; // Coloque seu número

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerProduto = (id: string) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const mensagem = carrinho
      .map(
        (p, i) =>
          `\n${i + 1}. ${p.nome} - R$ ${p.preco},00 - Quantidade: ${
            p.quantidade
          } un.`
      )
      .join("\n");

    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      `Olá! Gostaria de comprar os seguintes produtos: ${mensagem}\n\nTotal: R$ ${carrinho.reduce(
        (total, p) => total + p.preco,
        0
      )},00`
    )}`;

    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{ carrinho, adicionarProduto, removerProduto, finalizarCompra }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
