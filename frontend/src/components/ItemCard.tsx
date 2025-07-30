import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ItemCardProps = {
  produto?: { nome?: string };
  imagem: string;
  preco: string | number;
  nome: string;
};

export default function ItemCard({
  produto,
  imagem,
  preco,
  nome,
}: ItemCardProps) {
  return (
    <Card className=" hover:scale-[1.02] transition-transform duration-300 ease-in-out">
      <CardContent>
        <AspectRatio ratio={1 / 1} className="bg-muted overflow-hidden">
          <Image
            src={imagem}
            alt={nome}
            fill
            className="object-cover transition duration-300 hover:scale-105"
          />
        </AspectRatio>

        <div className="flex justify-between mt-2">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {produto?.nome || nome}
          </h3>
          <span className="text-sm font-bold text-primary">{preco}</span>
        </div>
      </CardContent>
    </Card>
  );
}
