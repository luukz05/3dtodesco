"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TbShoppingCart } from "react-icons/tb";

import { useCart } from "@/context/CartContext";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

export default function CartIcon() {
  const { carrinho, removerProduto, finalizarCompra } = useCart();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <TbShoppingCart className="size-5" />
          {carrinho.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {carrinho.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[600px] p-4">
        <h3 className="font-bold mb-2 ">Carrinho</h3>
        {carrinho.length === 0 ? (
          <p className="text-center text-gray-500/40">
            Seu carrinho está vazio :(
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {carrinho.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between items-center"
              >
                {/* Nome do produto alinhado à esquerda */}
                <span className="truncate">{item.nome}</span>

                {/* Preço sempre alinhado ao centro */}
                <span className="text-right font-medium">
                  R$ {item.preco},00
                </span>

                <span className="text-right font-medium">
                  {item.quantidade ?? 0} un.
                </span>

                {/* Botão remover alinhado à direita */}
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removerProduto(item.id)}
                >
                  <RxCross2 />
                </Button>
              </div>
            ))}

            <Button
              className="mt-2 w-full bg-green-600 hover:bg-green-500 text-white"
              onClick={finalizarCompra}
            >
              Finalizar no WhatsApp
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
