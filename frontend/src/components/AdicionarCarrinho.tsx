"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useCart } from "@/context/CartContext";

interface BotaoAdicionarCarrinhoProps {
  produto: { id: string; nome: string; preco: number; quantidade: number };
}

export default function BotaoAdicionarCarrinho({
  produto,
}: BotaoAdicionarCarrinhoProps) {
  const { adicionarProduto } = useCart();

  const handleClick = () => {
    adicionarProduto(produto);
    toast("Produto adicionado!", {
      description: produto.nome,
      duration: 2000,
    });
  };

  return (
    <Button className="w-50 hover:cursor-pointer" onClick={handleClick}>
      Adicionar ao carrinho
      <TbShoppingCartPlus className="size-5" />
    </Button>
  );
}
