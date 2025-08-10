import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type ItemCardProps = {
  id?: number | string;
  produto?: { nome?: string };
  imagem: string;
  preco: string | number;
  nome: string;
};

export default function ItemCard({
  id,
  produto,
  imagem,
  preco,
  nome,
}: ItemCardProps) {
  return (
    <Link href={`/produto/${id}`} className="group">
      <Card className=" hover:scale-[1.02] transition-transform duration-300 ease-in-out hover:cursor-pointer">
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
            <h3 className="text-base font-thin text-gray-900 truncate">
              {produto?.nome || nome}
            </h3>
            <span className="text-sm font-semibold text-primary">
              R$ {preco},00
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
