// app/loja/[id]/page.tsx
import NavbarDropdown from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const placeholderImages = ["/pcd.png", "/pcd.png", "/pcd.png", "/pcd.png"];

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  const data = await res.json();

  return data.products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default async function ProdutoPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <NavbarDropdown />

      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-20 justify-center items-center h-screen">
        {/* Carousel placeholder */}
        <div className="flex justify-center md:justify-start w-full md:w-[600px] h-[600px]">
          <Carousel>
            <CarouselPrevious className="hover:cursor-pointer" />
            <CarouselContent>
              {placeholderImages.map((img, i) => (
                <CarouselItem key={i} className="w-full h-full">
                  <Image
                    src={img}
                    alt={`Imagem placeholder ${i + 1}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full select-none"
                    priority={i === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className="hover:cursor-pointer" />
          </Carousel>
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col justify-around gap-15 flex-1">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-black mb-4">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed text-justify max-w-lg">
            {product.description}
          </p>

          <Button className="w-full md:w-auto hover:cursor-pointer">
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </main>
  );
}
