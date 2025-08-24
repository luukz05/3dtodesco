"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbShoppingCartBolt } from "react-icons/tb";

interface BotaoWhatsAppProps {
  numeroWhatsApp: string;
}

export default function BotaoPersonalizado({
  numeroWhatsApp,
}: BotaoWhatsAppProps) {
  const mensagem = `Olá 3D Todesco! Estou interessado em comprar um produto personalizado, gostaria de mais informações.`;
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
    mensagem
  )}`;

  return (
    <Link
      href={url}
      className="block px-3 py-2 text-sm  bg-blue-500 hover:bg-blue-600 hover:text-white text-white font-bold rounded-md"
      target="_blank"
    >
      Pedidos personalizados
    </Link>
  );
}
