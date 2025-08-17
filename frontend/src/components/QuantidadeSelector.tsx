"use client";
import { Button } from "@/components/ui/button";

interface QuantidadeSelectorProps {
  quantidade: number;
  setQuantidade: (q: number) => void;
}

export default function QuantidadeSelector({
  quantidade,
  setQuantidade,
}: QuantidadeSelectorProps) {
  return (
    <div className="flex items-center text-center justify-between gap-3 flex-row">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="w-9 h-9 text-lg text-center hover:cursor-pointer"
          size="sm"
          onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
        >
          -
        </Button>
        <span className="w-8 text-center">{quantidade}</span>
        <Button
          variant="outline"
          size="sm"
          className="w-9 h-9 text-lg text-center hover:cursor-pointer"
          onClick={() => setQuantidade(quantidade + 1)}
        >
          +
        </Button>
      </div>
      <div className="flex flex-row">
        <p className="text-sm text-gray-500 mt-2">
          Estoque:{" "}
          <span className="text-sm text-gray-500 font-black mt-2">
            Disponível
          </span>
        </p>
      </div>
    </div>
  );
}
