import Line from "@/components/line";
import SidebarFiltro from "@/components/SidebarFiltro";
import ListaProdutos from "@/components/ListaProdutos";
import { FiltroProvider } from "@/context/FiltroContext";

type ImagemProduto = { url: string; origem: string };
type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  imagens: ImagemProduto[];
  subcategoria?: string;
};

type Params = Promise<{ categoria: string }>;

async function getProdutos(categoria: string): Promise<Produto[]> {
  const res = await fetch(
    `http://127.0.0.1:5000/api/produtos/categoria/${categoria}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ProdutosPorCategoria({
  params,
}: {
  params: Params;
}) {
  const { categoria } = await params;
  const produtos = await getProdutos(categoria);

  const subcategorias: string[] = Array.from(
    new Set(produtos.map((p) => p.subcategoria).filter((s): s is string => !!s))
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex gap-6">
      <FiltroProvider>
        <SidebarFiltro subcategorias={subcategorias} />

        <section className="flex-1">
          <Line />
          <h1 className="text-4xl font-medium text-center mb-10 mt-10">
            {categoria === "filmes-e-series"
              ? "Filmes e Séries"
              : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </h1>

          <ListaProdutos produtos={produtos} />
        </section>
      </FiltroProvider>
    </main>
  );
}
