// components/BotaoWhatsApp.tsx
"use client"; // muito importante para ser client component

import { Button } from "@/components/ui/button";
import { TbShoppingCartBolt } from "react-icons/tb";

interface BotaoWhatsAppProps {
  produtoNome: string;
  numeroWhatsApp: string; // no formato internacional, ex: 5511999999999
  quantidade?: number; // opcional, padrão será 1
}

export default function BotaoComprarAgora({
  produtoNome,
  numeroWhatsApp,
  quantidade,
}: BotaoWhatsAppProps) {
  const handleClick = () => {
    const mensagem = `Olá 3D Todesco! Estou interessado em comprar o produto: ${produtoNome} - Quantidade: 1 un.`;
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      className="w-full md:w-1/2 hover:cursor-pointer bg-sky-600 hover:bg-sky-500 text-white"
      onClick={handleClick}
    >
      Comprar agora
      <TbShoppingCartBolt className="size-5" />
    </Button>
  );
}
