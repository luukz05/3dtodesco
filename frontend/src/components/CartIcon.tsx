"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TbShoppingCart } from "react-icons/tb";
import { ImWhatsapp } from "react-icons/im";
import { TbShoppingCartX } from "react-icons/tb";

import { useCart } from "@/context/CartContext";
import { RxCross2 } from "react-icons/rx";

export default function CartIcon() {
  const { carrinho, removerProduto, finalizarCompra, limparCarrinho } =
    useCart();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:cursor-pointer"
        >
          <TbShoppingCart className="size-5 " />
          {carrinho.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {carrinho.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-screen max-w-sm mr-1 sm:max-w-md md:w-[500px] md:mr-5 p-4 rounded-md">
        <h3 className="font-bold mb-2 text-center md:text-left">Carrinho</h3>
        {carrinho.length === 0 ? (
          <p className="text-center text-gray-500/40">
            Seu carrinho está vazio :(
          </p>
        ) : (
          <div className="grid gap-2">
            {carrinho.map((item, index) => (
              <div
                className="grid grid-cols-12 items-center p-2 border-b"
                key={`${item._id}-${index}`}
              >
                {/* Nome ocupa mais espaço no mobile */}
                <p className="col-span-5 text-xs sm:text-sm font-semibold truncate">
                  {item.nome}
                </p>
                <p className="col-span-2 text-xs sm:text-sm text-right text-black/50">
                  {item.quantidade} un.
                </p>

                {/* Preço */}
                <p className="col-span-3 text-xs sm:text-sm text-right">
                  R$ {item.preco},00
                </p>

                {/* Botão remover */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="col-span-2 text-red-600 hover:text-red-800 justify-self-end hover:cursor-pointer"
                  onClick={() => removerProduto(item.cartItemId)}
                >
                  <RxCross2 className="size-4 sm:size-5" />
                </Button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
              <Button
                className="w-full sm:flex-1 bg-green-600 hover:bg-green-500 text-white"
                onClick={finalizarCompra}
              >
                Finalizar no WhatsApp
                <ImWhatsapp className="size-4 ml-1" />
              </Button>
              <Button
                className="w-full sm:w-1/3 bg-red-600 hover:bg-red-500 text-white"
                onClick={limparCarrinho}
              >
                Limpar
                <TbShoppingCartX className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
