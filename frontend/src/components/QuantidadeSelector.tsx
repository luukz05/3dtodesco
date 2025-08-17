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
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
      >
        -
      </Button>
      <span className="w-8 text-center font-medium">{quantidade}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuantidade(quantidade + 1)}
      >
        +
      </Button>
    </div>
  );
}
