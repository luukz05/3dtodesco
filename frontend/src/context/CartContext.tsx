"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface Produto {
  _id: string;
  nome: string;
  preco: number;
}

interface ProdutoNoCarrinho extends Produto {
  cartItemId: string;
  quantidade: number;
}

interface CartContextProps {
  carrinho: ProdutoNoCarrinho[];
  adicionarProduto: (produto: Produto, quantidade?: number) => void; // <- aqui
  removerProduto: (cartItemId: string) => void;
  finalizarCompra: () => void;
  limparCarrinho: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<ProdutoNoCarrinho[]>([]);
  const numeroWhatsApp = "5515991950200";

  const adicionarProduto = (produto: Produto, quantidade: number = 1) => {
    console.log("Adicionando:", produto); // 👈 veja se o id muda
    setCarrinho((prev) => {
      const existente = prev.find((p) => p._id === produto._id);

      if (existente) {
        return prev.map((p) =>
          p._id === produto._id
            ? { ...p, quantidade: p.quantidade + quantidade }
            : p
        );
      } else {
        return [
          ...prev,
          { ...produto, cartItemId: crypto.randomUUID(), quantidade },
        ];
      }
    });
  };

  const removerProduto = (cartItemId: string) => {
    setCarrinho((prev) => prev.filter((p) => p.cartItemId !== cartItemId));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const mensagem = carrinho
      .map(
        (p, i) =>
          `${i + 1}. ${p.nome} - R$ ${p.preco},00 - Quantidade: ${
            p.quantidade
          } un.`
      )
      .join("\n");

    const total = carrinho.reduce(
      (total, p) => total + p.preco * p.quantidade,
      0
    );

    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      `Olá! Gostaria de comprar os seguintes produtos:\n${mensagem}\n\nTotal: R$ ${total},00`
    )}`;

    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto,
        finalizarCompra,
        limparCarrinho,
      }}
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
