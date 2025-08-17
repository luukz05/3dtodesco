// components/CarrinhoWhatsApp.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TbShoppingCartPlus, TbShoppingCartBolt } from "react-icons/tb";

interface Produto {
  nome: string;
  preco: number;
}

interface CarrinhoWhatsAppProps {
  numeroWhatsApp: string; // Ex: "5511999999999"
}

export default function CarrinhoWhatsApp({
  numeroWhatsApp,
}: CarrinhoWhatsAppProps) {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  // Adiciona um produto ao carrinho
  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  // Finaliza a compra enviando todos os produtos pelo WhatsApp
  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const mensagem = carrinho
      .map((p, i) => `${i + 1}. ${p.nome} - R$ ${p.preco},00`)
      .join("%0A"); // %0A = quebra de linha na URL

    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      `Olá! Gostaria de comprar os seguintes produtos:%0A${mensagem}`
    )}`;

    window.open(url, "_blank");
  };

  return { carrinho, adicionarProduto, finalizarCompra };
}
